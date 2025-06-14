# BPMN-To-Neo4j Frontend

This is the frontend which can be used to create a BPMN diagram and then export it to Neo4j database and visualise the graph in the browser itself!

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

> Main screen
![Screenshot 2024-03-27 at 11 38 40 PM](https://github.com/das-kushal/bpmn-neo4j-frontend-final/assets/86544278/551aa6eb-da5c-42bf-bddc-f4cb85bfc2be)

> Function of the buttons
![image](https://github.com/das-kushal/bpmn-to-neo4j-frontend/assets/86544278/e97094fe-74e0-48c5-aea8-476a495e4371)

> Full graph shown
> ![image](https://github.com/das-kushal/bpmn-to-neo4j-frontend/assets/86544278/f838a4d7-b958-4f7d-8ef4-f664656de944)


> Query tab with correct query
![](https://github.com/das-kushal/bpmn-to-neo4j-frontend/assets/86544278/5b86ccf5-7a11-4d2f-a8a0-5e44addca198)


> Query tab with wrong query
![](https://github.com/das-kushal/bpmn-to-neo4j-frontend/assets/86544278/aefca73e-2ec3-40a6-894d-be4206634b98)

> Here is a quick demo of the app



https://github.com/das-kushal/bpmn-to-neo4j-frontend/assets/86544278/ddda59e9-f4ea-4b5d-9a58-3b389c1baafa





