# testRigor Playground

testRigor Playground is a collection of interactive demos featuring various types of interactions with web elements, aimed at creating a testing environment.

The playground website is available at https://testrigorplayground.netlify.app/


## Executing

To execute the project for the first time for local development you need to:

```bash
git clone https://github.com/thiagonunes11/testRigorPlayground # Clone the project
cd testRigorPlayground # Move to the folder of the project
npm install # Install the packages
npm run dev # Run the server
```

### Deploying

There is an automatic deployment for this project. You need to first merge your changes with the staging branch `stg-env`. Once that is done, the staging website will be updated to check for any unexpected changes.

The staging website URL is https://stg-tr-playground.netlify.app/

Once confirmed that the changes are stable, you should create a Pull Request to merge `stg-env` into `main`. After it is merged, your changes will be available on the main website.