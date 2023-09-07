


Understand complexity.

Before we can even start thinking about success, we need to understand the enemy.And in software engineering, there's one enemy that looms large above all others.And that is complexity. 

Software is by far the most complex creation that humans have ever created.The Firefox browser, for instance, has around 10 million lines of code. And even older versions of Windows are said to have around 40 million. Source: https://fossbytes.com/how-many-lines-of-code-are-there-in-google-first-space-shuttle-facebook/

Many large enterprises, such as financial organizations, very easily exceeds more than 100 million lines of code that comprise their overall systems.

The problem is our tiny human brains cannot possibly comprehend this complexity and then we end up making mistakes.

And here, specifically, costly mistakes in the realm of design. Some things that we think is a good design may end up to be catastrophic.

This is why there is no shortage of examples of extremely large software projects where hundreds of millions or even billions of dollars are spent with absolutely zero result. Source: https://en.wikipedia.org/wiki/List_of_failed_and_overbudget_custom_software_projects

There is a large body of knowledge in the discipline of software engineering, agile software development methodologies and others that can guide us in helping dealing with the problems of building software at scale.However, this body of knowledge is a bit like the body of knowledge in psychology.Psychology should have figured out how to make us happy, but we are still very unhappy.Likewise, developing software at scale fails more often than not.

In this article, I propose by putting complexity front and center, we can have a new lens on how to organize software projects.

Thankfully, there's a whole discipline of thought we can draw from to investigate that further, specifically systems thinking. Source: https://en.wikipedia.org/wiki/Systems_thinking

Note, the idea to apply systems thinking to large scale software development is not new. For instance, it's one of the principles of the scaled agile framework (SAFE) to apply systems thinking. Source https://scaledagileframework.com/apply-systems-thinking/

However, in this article, I aim to bring some of the core ideas of systems thinking a bit more to the front and center to help us solve the challenges of complexity better.


## The Benefits Modularity

Modularity is one of the key tenets of software design.It is used to manage the complexity of systems by dividing a large system into smaller, more manageable parts.

Modularity can likewise be applied to organizational design.And we do so all the time. That is why we break up large organizations into departments, tribes, squads, teams, and other terms.

Modularity just simply means to divide something larger into smaller parts.which is easy, but what we are really interested in is how to do modularity well.The general guiding principle here is that we would want to group things together that are closely related and separate those that are not. Source: Griswold, W. 1995. "Modularity Principle." Available at: William Griswold [http://cseweb.ucsd.edu/users/wgg/CSE131B/Design/node1.html](http://cseweb.ucsd.edu/users/wgg/CSE131B/Design/node1.html).

The great advantage of doing this right is that we reduce the local complexities for teams.When a team can focus on one specific problem, then the team can execute faster.Because the less complexity we have to deal with, the faster and more safely we can develop software.

In software design, there are a few principles that help us achieve this, such as information hiding.Applied to teams, this would mean that what happens internally inside a team should be exposed to the outside as little as possible. In the similar way as we would want to leave the implementation details of a class secret to the wider system that uses the class.

To design a complex system in a maintainable way, designing the interfaces right is key.And the same, I believe, applies to Teams as well. To set up a successful organization, we need to first get it right how we divide it into parts. But then we also need to get the interfaces between these parts right.




## Regular Meetings

Let's quickly go through here for the tools that we have to shape teams, separate them, and keep them together.A team or squad is a very abstract thing and can be as little as a few boxes on an organizational chart.So in a way it matters little if we tell people you are in team X or you are in team Y.So, how do we make a team stick together or have different parts of a team or department be further apart?

The first tool we have at our availability less so these days than we had in the past is simply Physical Proximity.If we sit people together in a room or in a similar area, they will naturally come more closer together, thus increasing coupling between the different members of the team.

Another very powerful yet dangerous tool we have is regular meetings. The most popular of these being the stand up.Simply speaking, if we take a group of people and bring them together for a stand-up, either be it daily or on a different frequency, they will become more closely linked together.

With stand-ups or other meetings, we should always ask ourselves, is what is discussed relevant to everybody who participates?For instance, within the team, we may have two squads.And if these two squats operate relatively independently and there's little overlap between the work, then doing a stand-up together with these two squats is probably not a good idea.Since then, for every member, for about 50% of the time, something would be discussed that they don't really care about.Conversely, if there is a lot of overlap between the squads, it could well make sense to keep this stand-up going, because then whatever is discussed should be relevant to everyone.

Most importantly, we shouldn't just do stand-ups and meetings for their own sake. If somebody has defined on the organizational chart something or some group of people as a team, then we should not simply assume, let's do a stand-up for this, because every team must have a stand-up. But instead, we should ask ourselves, what is the amount of coupling we really desire for this group of people?

What applies to stand-ups here, of course, also applies to other types of meetings, such as refinement sessions, et cetera.

This in theory of course sounds easy but in practice is fiendishly difficult to get right.Rarely will you have a clean cut situation where there's either no or a lot of overlap between teams.There is very often some degree of overlap. And at the end, we need to make a judgment call as to whether this overlap warrants to connect the teams more closely together.

I would recommend as a general approach to err on the side of keeping teams apart.Try to operate them in as small units as possible.And only when you notice that there are big problems in communication and collaboration, then bring them together. But do so hesitantly and possibly also only temporarily, because sometimes there may only be temporary issues that require some closer collaboration for some time, which later will no longer be required.

## Alternative to Regular Meetings

Regular Meetings introduce what I would call a quite tight form of coupling.They have the potential to create a strong bond between team members because they see a lot of each other and they have the opportunity to engage in frequent and deep conversation. 

I think everybody working in an organization should be part of these regular meetings so that they have a home group they belong to.However, it should be noted here that ideally this is kept to a minimum and really as a means to connect with people whose work we really care about.

As much as we aim for separation of concern in building our system in small modular parts with small autonomous teams, that in practice is of course seldomly possible.More often than not, there are plenty of interdependencies between different systems components and the work that different teams do.

Thankfully, we have many other tools at our disposal to create what I would call loose coupling between teams.

These are, for instance,
Slack channels, these can be either permanent for the communication between specific teams.or temporary for specific items of work that include different collaboration partners.And of course, the same can be achieved with other technologies, such as Microsoft Teams or the collaboration platform of your choice.

Ad-hoc meetings, this is one of my favorite forms of collaboration here, specifically when we find a problem that needs to be solved that requires a few people to work together. It can be as little as two. Then we just say, let's meet. Let's talk about it. And that can be a very powerful form of collaboration and in my mind should be preferred over regular meetings whenever possible.

using leaders. Most teams have some form of leadership and creating connections through leaders can be a powerful form to reduce the local complexity for teams.To give an example, a leader for a team may go to the stand up for the team every day. And if they see that an issue arises that requires collaboration with another team, they either reach out to the team directly or to leaders of that team.Generally, if two teams have to work together, it is often better to establish a regular cadence between the leaders as opposed to the whole team.


## Leadership

A leader's tasks are very manifold. And I think one task that we don't always think as being first up on the list of what leaders should do is reducing complexity.But I think by reducing complexities, leaders can have a great impact.

However, by reducing complexity, we often think of for a leader like creating a great strategy, being a great communicator to make things simple for a team. So reducing complexity by things a leader actively does.

I think though a leader's greatest impact on reducing complexity is if they enable their members of their team to having to know less, having to worry about less.

We don't want to keep secrets from anybody or quench somebody's natural curiosity, but we still need to keep in mind that if every member of an organization would have to know everything that's going on everywhere else, we would be in a complete standstill.Thus, if there's anything that leaders can take out from the things that a team needs to worry about that can be done so safely, that should make the team overall more successful.

## Acknowledge our own ignorance.

Most dangerous for planning a software project is the hubris. Specifically the hubris that we believe we are smart enough to understand the problem and can come up with a brilliant solution. Especially if you are management level.

Acknowledging that we don't really know what we are doing is the first step to success.

## Loose coupling.

Create modular structures. Source: https://hbr.org/2020/01/taming-complexity

Information Hiding


