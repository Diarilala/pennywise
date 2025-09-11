-- Categories
--done
INSERT INTO categories (category_id, user_id, name) VALUES
  (gen_random_uuid(),'cffed480-dad0-4da9-b561-298321f05938' , 'Foodf'),
  (gen_random_uuid(),'cffed480-dad0-4da9-b561-298321f05938', 'Transportt'),
  (gen_random_uuid(),'cffed480-dad0-4da9-b561-298321f05938', 'Entertainmentt'),
  (gen_random_uuid(),'cffed480-dad0-4da9-b561-298321f05938', 'Utilitiess'),
  (gen_random_uuid(),'cffed480-dad0-4da9-b561-298321f05938', 'Shoppingg');

-- Expenses for September 2025
INSERT INTO expenses (expense_id, user_id, type,amount, date, category_id, description) VALUES
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','one-time', 45.50, '2025-09-02', 'c7057fa4-aa83-4c29-b7dd-2d2c371c6616', 'Groceries at supermarket'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','one-time', 12.00, '2025-09-03', 'c7057fa4-aa83-4c29-b7dd-2d2c371c6616', 'Bus ticket'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','one-time', 60.00, '2025-09-04', 'c7057fa4-aa83-4c29-b7dd-2d2c371c6616', 'Cinema night'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','one-time', 80.00, '2025-09-05', '72e2e25b-5d84-4949-a746-35925effa62e', 'Electricity bill'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','one-time', 120.00, '2025-09-06', '72e2e25b-5d84-4949-a746-35925effa62e', 'Clothes shopping'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','recurring', 30.00, '2025-09-07', '72e2e25b-5d84-4949-a746-35925effa62e', 'Lunch with friends'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','recurring', 25.00, '2025-09-08', '6ead8c35-27f1-4d5f-93a3-d6f478c1e6e3', 'Taxi ride'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','recurring', 15.00, '2025-09-09', '6ead8c35-27f1-4d5f-93a3-d6f478c1e6e3', 'Streaming subscription'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','recurring', 55.00, '2025-09-10', '6ead8c35-27f1-4d5f-93a3-d6f478c1e6e3', 'Water bill'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938','recurring', 200.00, '2025-09-10', 'cf8da8a7-c60d-471e-8d48-7227446d0083', 'Electronics purchase');

-- Incomes for September 2025
INSERT INTO incomes (income_id, user_id, amount, date, source, description) VALUES
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938', 4000.00, '2025-09-01', 'Salary', 'Monthly salary'),
  (gen_random_uuid(), 'cffed480-dad0-4da9-b561-298321f05938', 1500.00, '2025-09-08', 'Freelance', 'Freelance web project');