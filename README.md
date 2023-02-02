# Back end for an e-commerce application

* This application is built using TypeScript, mainly to facilitate the use of object-oriented design patterns. 
* It utilizes a PostgreSQL database to store and retrieve product and customer information, ensuring data integrity and efficient querying.
* The application follows a Clean Architecture approach, which separates concerns and allows for easy modification and scalability. Additionally, it incorporates Domain-Driven Design principles to align the application's structure with the business domain, resulting in a more intuitive and efficient user experience.


## Table of Contents
- [Getting Started](#getting_started)  
- [System Design](#system_design)
  - [Business Usecases](#business_usecases)
  - [Clean Architecture](#clean_architecture)
- [Patterns Used](#patterns_used)
  - [CQRS](#cqrs)
  - [DAO](#dao)
  - [Domain Events](#domain_events)
  - [Repository](#repository)
- [Database](#database)
  - [How to connect](#how_to_connect)
  - [ER diagram](#er_diagram)
- [Test](#test)
  - [Test Coverage](#test_coverage)
  
<a name="getting_started"></a>
## Getting Started
Install the dependencies
```
npm i
```
Run tests
```
npm run test
```
Start the app
```
npm run main
```
<a name="system_design"></a>
## System Design
<a name="business_usecases"></a>
### - Business Usecases
As the project proposes to be the back end of an ecommerce, the current use cases are:
- get_order
  - Gets an order by code
- get_orders
  - Gets all orders
- get_stock
  - Gets all items in a stock
- place_order
  - Makes an order
- save_stock
  - Saves item inside a stock
- simulate_freight
  - Simulates the freight for an order
- validate_coupon
  - Validates a coupon

<a name="clean_architecture"></a>
### - Clean Architecture
The main reason for choosing a clean architecture was the separation of responsibilities and the decoupling between parts of the system.
<br></br>
The core business logic is kept separate from the external concerns such as the user interface, database access, and other technical details. Each layer has the following responsibilities:
- Entities: This layer contains the core business entities and models, such as Coupon, Order, Cpf, etc. These entities represent the core business objects and encapsulate their state and behavior.

- Use Cases: This layer contains the application's business logic and defines the interactions between the entities. The use cases interact with the entities and perform actions based on the incoming requests.

- Interface Adapters: This layer contains the adapters that translate between the interfaces defined in the use cases layer and the outside world. For example, the HTTP controllers that handle incoming requests and the DAOs that interact with the database.

- Frameworks and Drivers: This layer contains the external dependencies and interfaces, such as the web framework ( express ) and the database ( postgres ).

#### UML Diagram

<img width="1009" alt="image" src="https://user-images.githubusercontent.com/56269786/215355328-1cc554b2-0f3e-45de-85fc-7ed8ddcf069d.png">

- Yellow: Entities
- Red: Use Cases
- Green: Interface Adapters
- Blue: Frameworks and Drives

<a name="patterns_used"></a>
## Patterns Used
<a name="cqrs"></a>
### - CQRS
Separates the responsibilities of handling user commands (write operations) and querying data (read operations) in a system.
<br></br>
By separating these responsibilities, the application can handle the high volume of both read and write operations more efficiently.
<br></br>
In this application, CRQS was used in conjunction with domain events where the Command side of the application processes user requests and generates domain events as a result of these requests. By doing so, changes to the Command side do not directly impact the Query side, and vice versa.  
<a name="dao"></a>
### - DAO (Data Access Object)
In this application, DAOs were used to provide a unified interface for accessing the Aggregates in the database.
<br></br>
The DAOs provide a convenient and unified interface for accessing data, while the Aggregates provide a domain-driven structure for organizing and managing the data. 
<br></br>
Each method is a pure sql wrapper for the database
<a name="domain_events"></a>
### - Domain Events
Domain Events were used to alert significant changes that occur within the domain, and to communicate these changes to other parts of the system. 
<br></br>
In this application, every time an order is created, an event called "OrderPlaced" is triggered
<a name="repository"></a>
### - Repository
Repositories were used for managing the persistence of domain entities while DAO were used to acess these informations.

<a name="database"></a>
## Database
<a name="how_to_connect"></a>
### - How to connect
<a name="er_diagram"></a>
### - ER Diagram
<a name="test"></a>
## Test
<a name="test_coverage"></a>
### - Test coverage
Test report for each Domain Entity
<p align="center">
<img width="883" alt="image" src="https://user-images.githubusercontent.com/56269786/216160868-71b94ca9-2e23-4082-9376-ef54b374e2b6.png">
</p>

## Folder Structure
```
.
├── application
│   ├── dao
│   ├── handler
│   ├── query
│   └── useCases
├── domain
│   ├── entity
│   ├── event
│   ├── factory
│   └── repository
├── infra
│   ├── broker
│   ├── controller
│   ├── dao
│   ├── database
│   ├── factory
│   ├── http
│   └── repository
└── main.ts
```
