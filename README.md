# generator-licence-plate

## 📌 Goal

Create a function that returns the N-th license plate in a specific alphanumeric sequence.

Each license plate:
- Has exactly **6 characters**
- Starts with numbers, followed by letters (e.g., `000000`, `000001`, ..., `999999`, `00000A`, etc.)
- Numbers increment faster than letters
- The sequence behaves like an odometer:
  - After `999999` → `00000A`
  - After `99999Z` → `00000B`
  - After `99999Z` → `0000AA`
  - ...
  - Eventually → `ZZZZZZ`
