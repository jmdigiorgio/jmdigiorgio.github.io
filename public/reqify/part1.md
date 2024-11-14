<h1 style="text-align: center">Reqify</h1>

<p style="text-align: center"><a href="https://github.com/jmdigiorgio/reqify" target="_blank">source code</a></p>

Requirements specs for complex systems are often complex themselves, which doesn't really help simplify the thing that needs to be built. And yet, it's necessary to eventually be able to simplify elements of the system or it won't be built well or at all. This is a recurring problem for large system development.

This is **one** requirement selected from the Office of Federal Financial Management's *Core Financial System Requirements (2006)*:

>---
>To support the Accounting Classification Management process, the Core financial system must provide automated functionality to do the following:
>
>SMA-01 Accounting classification—Maintain an accounting classification structure that includes the following elements:
>
>- Treasury Account Symbol
>- Budget fiscal year
>- Internal fund code
>- Organization
>- Program
>- Project
>- Activity
>- Cost center
>- Object class
>- Revenue source
>- Budget function
>- Budget sub-function code
>- Accounting period.
>
>Maintain each classification element independently. For example, budget fiscal year must be maintained as a separate value from the period of availability component in the TAFS.
>
>---

In a document that is hundreds of pages long containing hundreds or thousands of complex requirements like the one above, a full-time, dedicated team is required to simply keep track of them. When it comes to tracing these types of requirements to architectural elements of a system in development, determining interdependencies between requirements, and verifying and validating that the requirements have been met, the effort is extremely arduous, even with modern model-based systems engineering tools.

A new paradigm is required for design documentation of engineered products, documentation which is often compulsory in contracted work between business and government entities.

The Reqify project explores the viability of reverse engineering long-form documents to an atomic, model-based state by supposing that every natural language sentence consists of one or more semantic triples and that, hidden within these triples, is an emergent graph structure which can be analyzed and traversed by LLMs.

Initial results were promising. OpenAI's GPT-4o and GPT-4o mini models were tested with the script, which resulted in the automatic detection and extraction of hundreds of requirements from the Office of Federal Financial Management's *Inventory, Supplies, and Materials System Requirements (2003)*:
