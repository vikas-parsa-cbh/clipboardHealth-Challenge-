# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1 - Data structure 
    Acceptance Criteria: Create a new field called "id_reference" in the Agent table. In turn create a migration job or task to impact change in the other development environments.
    Time/effort: 5pt of fibonacci, not much effort.
    Implementation detail: The idea would be to continue keeping the agent ID as PK, which is the one that would continue to relate to the agent table, only that visually we would show a custom reference ID.
    Guesses: I assume that there is a table called Centers that is related to Facilities. Therefore the change has a visual connotation rather than a structural one.

## Ticket 2 - Modify Agent API Post/Update.
    Acceptance criteria: Allow the API that saves and modifies the Agent table to accept a new attribute called ID Reference.
    Time and effort: 5pt fibonacci, it is the work of a day or two.
    Implementation detail: Both the post method and the update method now receive a new parameter to be stored inside the Agent table called "id_reference".
    Guesses: I assume that the Facilities table contains the agent_id and the center_id, the relationship will remain the same, only that when calling the getShiftsByFacility function we don't have to touch it, I assume that it returns all the Agent parameters, so the change for this function is transparent.

## Ticket 3 - Modify Center UI
    Acceptance criteria: Add a new field called agent ID for agent registration and modification, in turn rear unit tests.
    Time and effort: 5pt fibonacci, one day of work.
    Implementation detail: Within the user interface of the centers, now you can edit and register a reference ID that will be stored internally through the Agent API.
    Guesses: -

## Ticket 4 - Modify generateReport function
    Acceptance criteria: Add the new Agent ID reference field which is going to be the ID that the centers expect to see in the report.
    Time and effort: 1pt fibonacci, should not take much effort.
    Implementation detail: Inside the report now we have to add one more attribute which is the new reference ID.
    Guesses: -