---
blog: maxrohde.com
date: "2018-12-09"
tags:
- programming
title: Designing Micro Services the Right Way
---

For a few years now, micro services have been all the rage when it comes to the architecture of large applications. Personally I have always been a bit puzzled about what was so new a great about micro services in comparison to what came before them: Service Oriented Architecture (SOA). Indeed, SOA itself is often portrayed as a frightful antipattern from our past to be mentioned in the same breath as CORBA.

To me, the move from CORBA et all to SOA to Micro Services has not been one of disrupting innovation but one of continuous learning; chiefly in relation to the technologies we employ. It just makes a world of difference setting up a big old monolithic application from the past or an express server in Node.JS (which is also a 'monolith' in its own right but just a smaller one - hopefully).

The core problem we are trying to solve has not changed: distributed computing. Unfortunately, one of the first things we learnt about distributed computing seems to have been given less attention recently: that it is best avoided wherever possible. Why? Because it introduces great complexity into an application and can result in many development and operational problems (see [YouTube: 10 Tips for failing badly at Microservices by David Schmitz](https://youtu.be/X0tjziAQfNQ)).

One of the most problematic areas is data or persisted state. If the same piece of data needs to be used by multiple services, things become very complicated since it is often required to keep data in sync between multiple places (see [YouTube: Managing Data in Microservices by Randy Shoup](https://youtu.be/E8-e-3fRHBw)).

Recently I came across a presentation which I think outlined a very nice approach for dealing with micro services - one that relied heavily on code generation, enforcing common standards and automated testing. Furthermore in the presented architecture one language was used primarily, which I think is a very good approach. I highly recommend viewing this presentation for anyone interested in a way to deal with the complexity of micro services:

[YouTube: Design Microservice Architectures the Right Way by Michael Bryzek](https://youtu.be/j6ow-UemzBc)

What I personally took away from this:

- Focus on testability. Allow for fast unit and integration tests and even testing with production data. Only code that is easy to test and heavily tested allows for fast and bold development. This organisation for instance automatically updates all their dependencies once per week - automatically, since they have full confidence that their tests will pick up any issues.
- Utilise code generation. The sad truth of micro services is that we will have to duplicate things, such as commonly used entities - especially if multiple programming languages are involved. Code generation provides an elegant way to deal with this unfortunate situation.
- Enforce common standards. Although micro services are intended to reduce complexity by dividing up a complex system into small manageable chunks, they can actually result in increased overall complexity, especially if many different technologies are employed. In that case, enforcing strict common standards can help in keeping things simple for developers and ops.
- Embrace events. Triggering services into action by using events rather than direct API calls can help in making a distributed system more predictable and easier to debug.

I think this presentation provides an excellent overview of best practices for micro services and I couldn't think of anything to criticise or add. I think it represents the best way of building micro services I am aware of as of now.

I do think, however, there is one important additional issue to consider, and that is that a micro service built according to the best principles and standards will still be a liability if it wasn't necessary to build a micro service to begin with. This is not so much the question if we should micro services or not (in any organisation of a certain size they are an imperative) but how many.

One of the key drivers of success for micro services within a larger system is to get the boundaries of the services right (see [bounded context](https://martinfowler.com/bliki/BoundedContext.html)) and I think we should aim to make micro services as large as possible so we have as few of them as possible; taking into consideration the restrictions of team size, data and complexity:

- Team: It might sound like heresy but I do think that one 'physical' micro service could be maintained by up to three to five teams (and not just one team per micro service). That of course would be the upper maximum, there is nothing wrong with having just one team per micro service. It really depends on what service you are building.
- Data: And some more heresy: I think that for data it is often better to scale up rather than scale out. Why? Data is all about state and being able to keep state within the physical confines of one systems leads to much improved performance and reduced complexity. Thus we should think about the database management system we will be using for our service and what is the maximum we can scale it up to. Then take 20% of that and ask yourself if your data will stay within that limit. If not, it might be prudent to break the micro service apart or maybe change the DBMS.
- Complexity: The main drivers of complexity in software are code size, inter-dependencies and heterogeneity. If our micro service would contain large amounts of code with many intricate inter-dependencies that tackles many different problems in different ways, it may be advisable to think about breaking the service up.

As mentioned, distributed systems are inherently more complex that non-distributed ones. Therefore, if we have larger micro services, our system becomes less distributed overall and we hopefully have less accidental complexity to deal with.

Thus, to sum things up, we must be aware of the dangers of micro services and deploy tooling strategically as outlined in the presentation as well as be mindful of how we can build our system in a way that we avoid the complexities of distributed systems as much as possible.
