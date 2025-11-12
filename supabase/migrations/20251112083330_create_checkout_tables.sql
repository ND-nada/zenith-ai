/*
  # Checkout and Payment Workflow Tables

  ## Overview
  Creates tables to support the complete checkout workflow from product selection to purchase completion.

  ## New Tables
  
  ### `orders`
  - `id` (uuid, primary key) - Unique order identifier
  - `user_id` (uuid, not null) - References auth.users
  - `product_id` (text, not null) - Product identifier from products data
  - `product_name` (text, not null) - Product name at time of purchase
  - `plan` (text, not null) - Selected plan (starter/professional/enterprise)
  - `amount` (numeric, not null) - Purchase amount
  - `status` (text, not null) - Order status: pending/completed/cancelled
  - `payment_method` (text) - Payment method used
  - `created_at` (timestamptz) - Order creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### `user_products`
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, not null) - References auth.users
  - `product_id` (text, not null) - Product identifier
  - `product_name` (text, not null) - Product name
  - `plan` (text, not null) - Active plan
  - `price` (numeric, not null) - Monthly price
  - `status` (text, not null) - active/cancelled/expired
  - `order_id` (uuid) - References orders table
  - `activated_at` (timestamptz) - When product was activated
  - `expires_at` (timestamptz) - Expiration date (if applicable)
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last update

  ## Security
  - Enable RLS on all tables
  - Users can only view their own orders and products
  - Users can create orders for themselves
  - Users can view their own active products
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  plan text NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  payment_method text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_products table
CREATE TABLE IF NOT EXISTS user_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  plan text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  activated_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_user_products_user_id ON user_products(user_id);
CREATE INDEX IF NOT EXISTS idx_user_products_status ON user_products(status);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_products ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User products policies
CREATE POLICY "Users can view own products"
  ON user_products FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products"
  ON user_products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products"
  ON user_products FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_products_updated_at
  BEFORE UPDATE ON user_products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();