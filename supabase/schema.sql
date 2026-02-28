-- =============================================
-- NEXT-CAFE FULL SCHEMA
-- Yeni bir Supabase projesinde sıfırdan çalıştırılır.
-- Supabase SQL Editor'e yapıştırıp çalıştır.
-- =============================================

-- =============================================
-- 1. CATEGORIES TABLOSU
-- =============================================
-- main_category: drinks | meals | desserts
-- sub_type     : hot | cold  (drinks)
--                breakfast | lunch | dinner  (meals)
--                cake | pastry | cookie | ice-cream | special  (desserts)

CREATE TABLE IF NOT EXISTS categories (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  label         text        NOT NULL,
  slug          text        NOT NULL UNIQUE,
  main_category text        NOT NULL,
  sub_type      text        NOT NULL,
  is_active     boolean     NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT chk_categories_main_category CHECK (
    main_category IN ('drinks', 'meals', 'desserts')
  ),
  CONSTRAINT chk_categories_sub_type_match CHECK (
    (main_category = 'drinks'   AND sub_type IN ('hot', 'cold'))
    OR (main_category = 'meals'    AND sub_type IN ('breakfast', 'lunch', 'dinner'))
    OR (main_category = 'desserts' AND sub_type IN ('cake', 'pastry', 'cookie', 'ice-cream', 'special'))
  )
);

-- =============================================
-- 2. PRODUCTS TABLOSU
-- =============================================
-- image_url       : Cloudinary CDN URL'i
-- image_public_id : Cloudinary'de silme/güncelleme için kullanılan unique key
--                   (örn: "next-cafe/products/abc123")
--                   Supabase Storage'dan Cloudinary'e geçişte eklendi.
-- variants        : [{"name": "M", "price": 85}, {"name": "L", "price": 100}]
-- allergens       : ['gluten', 'milk', 'nuts', 'soy', 'egg']

CREATE TABLE IF NOT EXISTS products (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text        NOT NULL UNIQUE,
  title           text        NOT NULL,
  description     text,
  image_url       text,
  image_public_id text,
  price           numeric(10, 2) NOT NULL DEFAULT 0,
  discount_rate   numeric(5, 2)  NOT NULL DEFAULT 0,
  category_id     uuid        REFERENCES categories(id) ON DELETE SET NULL,
  is_active       boolean     NOT NULL DEFAULT true,
  is_featured     boolean     NOT NULL DEFAULT false,
  is_new          boolean     NOT NULL DEFAULT false,
  is_popular      boolean     NOT NULL DEFAULT false,
  is_out_of_stock boolean     NOT NULL DEFAULT false,
  calories        integer,
  allergens       text[]      NOT NULL DEFAULT '{}',
  tags            text[]      NOT NULL DEFAULT '{}',
  variants        jsonb       NOT NULL DEFAULT '[]',
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- 3. İNDEKSLER (performans)
-- =============================================

-- Kategori filtreleme: menu/drinks/cold gibi sorgular için
CREATE INDEX IF NOT EXISTS idx_categories_main_sub
  ON categories(main_category, sub_type);

-- Ürün sorguları
CREATE INDEX IF NOT EXISTS idx_products_category_id
  ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active
  ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured
  ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_popular
  ON products(is_popular);