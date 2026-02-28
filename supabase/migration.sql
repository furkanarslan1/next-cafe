-- =============================================
-- NEXT-CAFE DB MIGRATION
-- Schema (menuSchema.ts) ile DB'yi senkronize eder
-- =============================================

-- =============================================
-- 1. CATEGORIES TABLOSU
-- =============================================
-- Yeni kolonlar: main_category, sub_type, is_active
-- Schema'daki mainCategory enum → DB check constraint
-- Schema'daki subType → DB check constraint (mainCategory ile uyumlu)

ALTER TABLE categories
  ADD COLUMN main_category text,
  ADD COLUMN sub_type      text,
  ADD COLUMN is_active     boolean DEFAULT true;

-- NOT NULL uygula (tablo boşsa sorun olmaz, doluysa önce UPDATE gerekir)
ALTER TABLE categories ALTER COLUMN main_category SET NOT NULL;
ALTER TABLE categories ALTER COLUMN sub_type SET NOT NULL;

-- slug benzersiz olmalı (URL'de kullanılacak)
ALTER TABLE categories ADD CONSTRAINT categories_slug_key UNIQUE (slug);

-- mainCategory sadece bu 3 değer olabilir
ALTER TABLE categories ADD CONSTRAINT chk_categories_main_category
  CHECK (main_category IN ('drinks', 'meals', 'desserts'));

-- sub_type, main_category ile uyumlu olmalı
ALTER TABLE categories ADD CONSTRAINT chk_categories_sub_type_match
  CHECK (
    (main_category = 'drinks'   AND sub_type IN ('hot', 'cold'))
    OR (main_category = 'meals'    AND sub_type IN ('breakfast', 'lunch', 'dinner'))
    OR (main_category = 'desserts' AND sub_type IN ('cake', 'pastry', 'cookie', 'ice-cream', 'special'))
  );

-- =============================================
-- 2. PRODUCTS TABLOSU
-- =============================================

-- 2a. category_slug (text FK) → category_id (uuid FK)
--     URL'de slug kullanılır ama DB ilişkisi uuid ile kurulur (veri bütünlüğü)
ALTER TABLE products
  ADD COLUMN category_id uuid REFERENCES categories(id) ON DELETE SET NULL;

ALTER TABLE products DROP COLUMN IF EXISTS category_slug;

-- 2b. type_slug artık gereksiz (main_category/sub_type category'den gelecek)
ALTER TABLE products DROP COLUMN IF EXISTS type_slug;

-- 2c. images (jsonb array) → image_url (text, tek resim)
--     Supabase Storage'dan Cloudinary'e geçişte image_public_id de eklendi.
--     image_public_id: Cloudinary'de silme/güncelleme için gerekli olan unique identifier.
ALTER TABLE products DROP COLUMN IF EXISTS images;
ALTER TABLE products ADD COLUMN image_url        text;
ALTER TABLE products ADD COLUMN image_public_id  text;

-- 2d. Schema'daki boolean alanlar (attributes jsonb yerine ayrı kolonlar → sorgulanabilir)
ALTER TABLE products
  ADD COLUMN is_featured    boolean DEFAULT false,
  ADD COLUMN is_new         boolean DEFAULT false,
  ADD COLUMN is_popular     boolean DEFAULT false,
  ADD COLUMN is_out_of_stock boolean DEFAULT false;

-- 2e. Besin ve etiket bilgileri
ALTER TABLE products
  ADD COLUMN calories  integer,
  ADD COLUMN allergens text[] DEFAULT '{}',
  ADD COLUMN tags      text[] DEFAULT '{}';

-- 2f. Varyantlar (S/M/L, tek/cift shot vb.) - JSONB olarak saklanir
--     Ornek: [{"name": "M", "price": 85}, {"name": "L", "price": 100}]
ALTER TABLE products ADD COLUMN variants jsonb DEFAULT '[]';

-- 2g. slug benzersiz olmalı
ALTER TABLE products ADD CONSTRAINT products_slug_key UNIQUE (slug);

-- =============================================
-- 3. İNDEKSLER (performans)
-- =============================================

-- Kategori filtreleme: menu/drinks/cold gibi sorgular için
CREATE INDEX idx_categories_main_sub ON categories(main_category, sub_type);

-- Ürün sorguları
CREATE INDEX idx_products_category_id  ON products(category_id);
CREATE INDEX idx_products_is_active    ON products(is_active);
CREATE INDEX idx_products_is_featured  ON products(is_featured);
CREATE INDEX idx_products_is_popular   ON products(is_popular);

-- =============================================
-- 4. (OPSIYONEL) sub_categories TABLOSU
-- =============================================
-- Şu anki yapıda sub_categories'e gerek kalmadı.
-- categories tablosunda main_category + sub_type zaten bu işi görüyor.
-- İleride ihtiyaç olmazsa kaldırabilirsin:
-- DROP TABLE IF EXISTS sub_categories;
