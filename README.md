# Getting Started

## 1. Clone the Repository

Navigate to the project folder:
cd <repository-name>

Then run below clone command <br/>
git clone https://github.com/kirthigamerlin-creator/BookHaven.git



## 2. Sync with Main Branch

Ensure you are on the latest `main` branch:

git checkout main <br/>
git pull origin main

## 3. Create a Feature Branch

Create a new feature branch from `main`:

git checkout -b feature/**feature-name**

Example:

git checkout -b feature/categories

## 4. Verify Current Branch

git branch

The active branch will be marked with `*`.

Example:

* feature/categories <br/>
  main

## 5. Make Changes and Commit

Stage your changes:

git add .

Commit the changes:

git commit -m "Add user login feature"

## 6. Push the Feature Branch

Push the branch to the remote repository:

git push -u origin feature/**feature-name**

Example:

git push -u origin feature/categories

## 7. Create a Pull Request

1. Go to the repository on GitHub.
2. Open the **Pull Requests** tab.
3. Click **New Pull Request**.
4. Select:
   - Base branch: `main`
   - Compare branch: `feature/<feature-name>` eg., feature/categories
5. Add a title and description.
6. Submit the Pull Request for review.

## Branch Naming Convention

Use the following naming pattern:

feature/**feature-name** <br/>
bugfix/**bug-description** <br/>
hotfix/**issue-name** <br/>

Examples:

feature/book-search <br/>
feature/cart-page <br/>
bugfix/login-validation <br/>
hotfix/payment-error <br/>
