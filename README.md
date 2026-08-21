### KNINE ADMIN

Use the appropriate .env file based on the environment:

- Local development: `.env.development.local `
- Public development: `.env.development`
- Production: `.env.production`

Main Branches:

- Local development: `development`
- Public development: `public-dev`
- Production: `main`

==

- Rocknblock/main - is maintained by RocknBlock and consists of the latest code and updates provided by our development team. Do not push there!

This branch (`rocknblock/main`) is maintained by RocknBlock and consists of the latest code and updates provided by our development team. Please note the following:

- **Branch Purpose**: This branch is specifically for delivering the code developed by RocknBlock to the customer's repository.
- **Customer Contributions**: There are should be no changes or contributions from the customer in this branch.
- **Synchronization**: Any updates or modifications made by RocknBlock will be pushed to this branch.
- **Main Branch Reference**: For the main branch of the customer's repository, please refer to `main` or the respective primary branch used by the customer.

## Usage

Feel free to use the code in this branch as a reference or basis for further development. If you encounter any issues or have any questions, please reach out to our support team.

### Development

Step 1. Copy `.env.example` to one of `.env` above

```bash
cp .env.example .env.local
```

Step 2. Fill out the `.env`.

Step 3. Install dependencies

```bash
yarn install
```

Step 4. Start the development server

```bash
yarn dev
```
