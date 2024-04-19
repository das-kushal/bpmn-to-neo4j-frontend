# BPMN-To-Neo4j Frontend

This is a frontend which can be used to create a BPMN diagram and then export it to Neo4j database and visualise the graph in the browser itself

## What are the features included:

### What can the features given ?

- Create BPMN diagram
- Import BPMN diagram from local system
- Download the BPMN diagram as BPMN 2.0 file
- Download the BPMN diagram as SVG file
- Export the BPMN to Neo4j graph database
- Visualise the graph in the browser itself and get to see the information about nodes and edges

#### Note: You can check out [Demo](https://bpmn2neo4j.vercel.app/) here

### How to use it

#### Clone the repository

```
git clone https://github.com/das-kushal/bpmn-to-neo4j-frontend
```

#### Install dependencies

```
yarn
```

or

```
npm install
```

#### Create .env.local file and  write your own credentials for neo4j

```
VITE_NEO4J_URL="<your-neo4j-url>"
VITE_NEO4J_USERNAME="<your-neo4j-username>"
VITE_NEO4J_PASSWORD="<your-neo4j-password>"
```

#### Now run the project with this command

```
yarn dev
```

or

```
npm run dev
```

Note: Make sure that your Neo4j is up and running

#### Here are some images

![Screenshot 2024-03-27 at 11 38 40 PM](https://github.com/das-kushal/bpmn-neo4j-frontend-final/assets/86544278/551aa6eb-da5c-42bf-bddc-f4cb85bfc2be)

![Screenshot 2024-03-27 at 10 50 42 PM](https://github.com/das-kushal/bpmn-neo4j-frontend-final/assets/86544278/a6027164-4665-4760-81fa-2e543058174f)

![Screenshot 2024-03-27 at 10 21 50 PM](https://github.com/das-kushal/bpmn-neo4j-frontend-final/assets/86544278/ceb720bd-4033-444c-9c4e-a222dccd4eac)
