# Create Task Endpoints

## Basic CRUD Controller

**Implement a TaskController with these endpoints:**
- GET /tasks - Get all tasks
- GET /tasks/:id - Get task by ID
- POST /tasks - Create new task
- PUT /tasks/:id - Update task
- DELETE /tasks/:id - Delete task

**Deliverables:**
- five endpoints as described in the details above
- task service that will handle all repository connections

**Notes:**
- task.entity already created and setup
- basic create and update dtos have already been setup

# Business Rules

## Enhance the GET /tasks endpoint to support Filtering and Sorting

**Query Parameters:**
- status - Filter by task status
- priority - Filter by priority level
- overdue - Boolean to show only overdue tasks
- sortBy - Sort by 'createdAt', 'dueDate', or 'priority'
- sortOrder - 'ASC' or 'DESC'

**Deliverables:**
- setup the query dto object in the file provided
- able to filter and sort based on descriptions above when using the GET /tasks endpoint

## Validation
**Task Progression**
- TODO -> IN_PROGRESS -> COMPLETED
- TODO -> COMPLETED
- Backward transitions not allowed

**Date Validation**
- Due date cannot be in the past
- HIGH priority tasks cannot have due dates more than 7 days away
- MEDIUM priority tasks cannot have due date more than 30 days away

**Deliverables:**
- setup validations in the task service that should be utilized for both create and update (where applicable)