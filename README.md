# portfolio-management
A React-based portfolio management dashboard featuring blog listings and Excel-driven performance analytics with equity and drawdown charts built as part of a frontend assignment.

## Features

### Home Page
- Displays a collection of blogs related to trading, investing, and portfolio management
- Clean, card-based layout
- Responsive UI

### Portfolio Page
- Displays portfolio statistics using data from an Excel file
- Month-on-month trading returns for each year
- Visual representation of:
  - Equity Curve
  - Drawdown Chart
- Tabular view of returns

## Data Source
- Uses an **Excel (.xlsx)** file as the data source
- Data is parsed and transformed on the client side to generate:
  - Monthly returns
  - Year-wise performance
  - Chart datasets

## Tech Stack

- React.js
- JavaScript (ES6+)
- HTML5 & CSS3
- React Router
- Chart Library (Recharts)
- xlsx (for Excel parsing)

## Setup
```bash
npm install
npm start
