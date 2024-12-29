# Candidate Takehome Exercise
This is a simple backend engineer take-home test to help assess candidate skills and practices.  We appreciate your interest in Voodoo and have created this exercise as a tool to learn more about how you practice your craft in a realistic environment.  This is a test of your coding ability, but more importantly it is also a test of your overall practices.

If you are a seasoned Node.js developer, the coding portion of this exercise should take no more than 1-2 hours to complete.  Depending on your level of familiarity with Node.js, Express, and Sequelize, it may not be possible to finish in 2 hours, but you should not spend more than 2 hours.  

We value your time, and you should too.  If you reach the 2 hour mark, save your progress and we can discuss what you were able to accomplish. 

The theory portions of this test are more open-ended.  It is up to you how much time you spend addressing these questions.  We recommend spending less than 1 hour.  


For the record, we are not testing to see how much free time you have, so there will be no extra credit for monumental time investments.  We are looking for concise, clear answers that demonstrate domain expertise.


# Feedback

> I want to provide feedback on the task and the current codebase. As engineers and professionals, we can always engage in constructive conversations about feedback. If my approach is debatable, I would happily discuss and adjust it from an HR and technical perspective. Confident that it offers some insights to improve your assignments if you aim to.
> 
> ### Refactoring and Code Structure:
> Had I kept the initial structure and followed the original approach without refactoring, the practical portion of Part 1 would have taken me about an hour. I'm not seeking extra credit for time spent; I aim to use my time efficiently.
> 
> Here is the reasoning behind my decision: I wasn't sure if the existing structure was intentional or due to time constraints on your side, especially considering the codebase didn't adhere to minimal structural standards. This assignment might be given to all candidates, regardless of experience, which confused me about your expectations of me. Given the level expected for this role, clearer guidance on this point would have been very helpful, especially since some basic good practices expected of a senior developer role were not in place. 
> 
> Nevertheless, the refactoring chore was enjoyable, and it took to achieve the rest more comfortably since I'm accustomed to handling similar structures. My changes are still basic and would need even more production refactoring, depending on your setup. I also respected the existing codebase; as you mentioned, other products might use this code in future use cases.
> 
> Delivering clean, maintainable code with minimal refactoring is necessary for scalability, extensibility, and ease of understanding—this is especially true when preparing for production or CI/CD. But minimal structure is essential even when working on a take-home exercise, and this approach aligns with your request to value my time.
> 
> ### Commenting on Code:
> I've added comments where necessary to explain my approach and assumptions. My practices include:
> - **git workflow**
> - **Testing**
> - **Clear separation of concerns** between application logic, business logic, and setup logic
> - **Respect for the exercise**, regardless of personal opinions
> - **Continuous improvement of the process and codebase structure as needed**
> 
> This approach not only saves time but also reflects my overall practices. Well-commented code helps future developers or reviewers understand the thought process behind decisions and ultimately saves me time.
> 
> ### Technical Debt:
> I fully understand that most projects come with technical debt and infrastructure challenges. In my experience, we often prioritize business needs while managing legacy code and debt. I'm comfortable working within these constraints and am always ready to collaborate with the team to find solutions that keep the business running smoothly.
> 
> ### Team Collaboration:
> I am a strong team player, always focused on contributing to the team's and the business's success. I know that solving technical debt and improving infrastructure is an ongoing process. I'm committed to supporting my colleagues in these challenges while ensuring timely feature delivery. Sometimes, we work with what we have until there's time for refactoring, but we keep moving forward as a team, with a smile. :)
> 
> I look forward to discussing my approach to your assignments and any adjustments you think are necessary for the project.

# Project Overview
This project is a simple game database and consists of 2 components.  

The first component is a VueJS UI that communicates with an API and renders data in a simple browser-based UI.

The second component is an Express-based API server that queries and delivers data from an SQLite data source, using the Sequelize ORM.

This code is not necessarily representative of what you would find in a Voodoo production-ready codebase.  However, this type of stack is in regular use at Voodoo.


# Project Setup

## Prerequisites

 - Before starting the setup, make sure you have the following   
   installed:

	 - Node.js 
	 - NPM 
	 - Git Environment Setup

- Clone the repository: First, clone the repository to your local
  machine:

```bash
git clone git@github.com:pgdd/voodoo_wizz.git
cd voodoo_wizz.git
```
 - Create environment files:

```bash
cp .env.example .env.development
cp .env.example .env.test
```

 - Configure each .env file:

Example .env.development configuration (for local development):

```bash
# Environment: Development
# This configuration is used for the local development environment.

NODE_ENV=development    # Specifies the environment (development)
PORT=3000               # Port on which the app runs in development
DB_NAME=database.sqlite3 # SQLite database name for development
DB_USERNAME=null        # Username for database (if applicable)
DB_PASSWORD=null        # Password for database (if applicable)
DB_DIALECT=sqlite
DB_PORT=null
```
Example .env.test configuration (for testing):
```bash
# Environment: Test
# This configuration is used for testing purposes.

NODE_ENV=test           # Specifies the environment (test)
PORT=3001               # Port on which the app runs in test environment
DB_NAME=database_test.sqlite3  # SQLite database name for testing
DB_PORT=null

# Database configurations for testing
DB_USERNAME=null        # Username for database (if applicable)
DB_PASSWORD=null        # Password for database (if applicable)
DB_DIALECT=sqlite       # Dialect to use with SQLite in testing
```

> Note: For Windows compatibility, you may want to add the cross-env
> package to handle environment variables.

## Installation & Development

**Installation dependencies**
```bash
npm install
```
- **Start Development Server**

```bash
npm run dev
```
This command will:

 1. Run ESLint checks 
 2. Reset the development database 
 3. Run migrations and seeds 
 4. Start the server with PM2 in development mode

**Running Tests**
```bash
npm run test
```
This command will:
 1. Prepare the test environment
 2. Run migrations for the test database
 3. Execute the test suites

**Available Scripts**

*Development*
`npm run dev`: Full development setup and server start
`npm run eslint`: Run ESLint with automatic fixes
`npm run reset-db`: Reset the development database

*Database Management*
`npm run restore-dev-migrations`: Apply migrations for development
`npm run restore-dev-seeds`: Apply seeds for development
`npm run clean-dev-migrations`: Undo all migrations

*Testing*
`npm run test`: Run the test suite with migrations
npm run prepare-test: Prepare the test database only

*Production*
`npm start`: Run migrations and start the production server
`npm run migrate-production`: Run migrations for production


**Database Structure**
```bash
database/storage/          # Not tracked in Git
├── .gitkeep               # Maintains folder structure
├── database.sqlite3       # Development database
└── database_test.sqlite3  # Test database
```

> Production Note: While SQLite is used for development and testing,
> production environments should use a more robust solution like
> PostgreSQL, configurable via environment variables.

**Access Points**

`Frontend`: http://localhost:3000
`API`: http://localhost:3000/api/games

> **Troubleshooting** 
> If you encounter SQLite3 related errors:
> `npm rebuild` 
> Or specifically:
> `npm rebuild sqlite3` 
> 
> You may need to do this after:
> Switching Node.js versions, Changing operating systems, After certain dependency updates

## Development Workflow

**Git Flow**
We use a modified Git Flow workflow:
```bash
main                  # Production releases
   ├── develop        # Development integration
   ├── feature/*      # Feature branches
   ├── hotfix/*       # Production fixes
   └── release/*      # Release candidates
```
**Creating a New Feature**
Update develop branch:
```bash
git checkout develop
git pull origin develop
```
Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```
**Atomic Commits**
We maintain atomic commits for clarity.  Commit types include:

feat: New feature
fix: Bug fix
chore: Maintenance tasks
docs: Documentation updates

**Example commit messages:**
```bash
git commit -m "feat(games): add search functionality"
git commit -m "fix(database): resolve SQLite connection issues"
git commit -m "docs: update README with new API features"
```
**Before Committing:**

 - Ensure tests pass:
```
npm run test
```
 - stage and commit:

```bash
git add .
git commit
```
 - Create a pull request to develop.
 - Merge using --no-ff to preserve feature history:

```bash
git checkout develop
git merge --no-ff feature/your-feature-name
git push origin develop
```
# Practical Assignments

Pretend for a moment that you have been hired to work at Voodoo.  You have grabbed your first tickets to work on an internal game database application. 

#### FEATURE A: Add Search to Game Database
The main users of the Game Database have requested that we add a search feature that will allow them to search by name and/or by platform.  The front end team has already created UI for these features and all that remains is for the API to implement the expected interface.  The new UI can be seen at `/search.html`

The new UI sends 2 parameters via POST to a non-existent path on the API, `/api/games/search`

The parameters that are sent are `name` and `platform` and the expected behavior is to return results that match the platform and match or partially match the name string.  If no search has been specified, then the results should include everything (just like it does now).

Once the new API method is in place, we can move `search.html` to `index.html` and remove `search.html` from the repo.

#### FEATURE B: Populate your database with the top 100 apps
Add a populate button that calls a new route `/api/games/populate`. This route should populate your database with the top 100 games in the App Store and Google Play Store.
To do this, our data team have put in place 2 files at your disposal in an S3 bucket in JSON format:

- https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/android.top100.json
- https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/ios.top100.json

# Theory Assignments
You should complete these only after you have completed the practical assignments.

The business goal of the game database is to provide an internal service to get data for all apps from all app stores.  
Many other applications at Voodoo will use consume this API.

#### Question 1:
We are planning to put this project in production. According to you, what are the missing pieces to make this project production ready? 
Please elaborate an action plan.

#### Question 2:
Let's pretend our data team is now delivering new files every day into the S3 bucket, and our service needs to ingest those files
every day through the populate API. Could you describe a suitable solution to automate this? Feel free to propose architectural changes.