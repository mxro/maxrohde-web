---
title: 'Death by Cloud or How to Build Brittle Systems'
publish: true
coverImage: 'cindy-tang-ob-hsLNxYPc-unsplash.jpg'
id: 'death-by-cloud-or-how-to-build-brittle-systems'
blog: 'maxrohde.com'
date: 2024-03-02
summary: 
authors:
  - max
tags:
  - 'serverless'
  - 'cloud'
  - 'architecture'
  - 'opionion'
categories:
  - 'code'
---

The allure of serverless computing and cloud-based solutions was once irresistible to me. The promise of speedier system development and simpler maintenance seemed like a dream come true. I eagerly advocated for these technologies, writing numerous articles on the subject. Yet, as time passed, my enthusiasm waned as I came across a number of challenges which lead me to believe that cloud computing and serverless architectures are not the cure all they were touted to be.

In this article, I will first summarise some learnings we have gained over the past years of using Serverless and then discuss the surprisingly fleeting nature of serverless solutions using an example. Lastly, I propose a number of considerations for building more sustainable systems.

# Some Learnings from a Decade of Serverless

Serverless has been extensively discussed in the past years. Here some of the key learnings:

- **Infrastructure Complexity**: Serverless computing emerged as a simplified approach to application development, but the infrastructure it requires can be unexpectedly complex. Tasks like setting up an API gateway with Lambdas can result in [extensive configuration](https://github.com/goldstack/goldstack/tree/fc0fbd4c356d7efb3ccc06f775ca5f12500f3052/workspaces/templates/packages/serverless-api/infra/aws), increasing brittleness and the learning curve for developers.
- **Costs**: Cost-wise, serverless is often marketed as economical but can lead to [higher expenses](https://einaregilsson.com/serverless-15-percent-slower-and-eight-times-more-expensive/) due to [unpredictable pricing models](https://dev.to/colinchartier/serverless-is-more-expensive-than-you-d-expect-30o1). These costs can outweigh savings from reduced physical hardware needs.
- **Backwards Compatibility**: Service evolution poses another challenge; cloud providers frequently deprecate services or versions, forcing developers to rewrite applications for compatibility. This disrupts operations and shifts focus from innovation to maintenance.
- **SDK Dependency Hell**: Integration with cloud services has also become more complicated. The vast number of features leads to bloated SDKs and '[dependency hell](https://www.browserlondon.com/blog/2020/09/02/dependency-hell-how-to-avoid-it/)', where managing libraries and their security updates consumes significant time and resources.
- **Enhanced Security**: Despite these hurdles, serverless computing does offer enhanced security through better isolation between components. This architecture limits the impact of breaches, allowing for more secure, compartmentalised service management.

In summary, while serverless technology provides certain advantages such as improved security, it also introduces complexities in infrastructure setup, cost management, service compatibility, integration processes, and dependency maintenance that organizations must navigate carefully.

## The Fleeting Nature of Cloud-Based Systems: An Example

Among the various concerns discussed, one stands out as particularly troubling to me: the transient nature of cloud-based systems. These systems are not built to endure; they are fleeting. This impermanence is concerning because it contradicts one of the purported benefits of serverless computing—that it requires less maintenance due to the service provider managing many infrastructure layers. While this is still somewhat true, other factors have emerged that complicate ongoing operations.

Consider a broad comparison between a modern cloud-based solution and embedded software running on a manufacturing machine. Some machines operate on software that is decades old and is still functional. In contrast, a serverless system seems to demand significant overhauls every few years just to remain operational.

Let me illustrate this with an example from my personal experience, for my project [Goldstack](https://github.com/goldstack/goldstack). Last year, around December, I received a notification from AWS informing me that I could no longer update my Lambda functions because they were implemented using Node 16—a runtime AWS was phasing out (also due to [Node 16 end of life](https://nodejs.org/en/blog/announcements/nodejs16-eol)). Initially, updating my application's code and build logic to Node 18 seemed straightforward—it involved [modifying several Lambdas and ironing out some code incompatibilities over a few days](https://github.com/goldstack/goldstack/pull/345).

`## [Action Required] AWS Lambda end of support for Node.js 16`

However, I soon discovered that the new Node 18 Lambda runtime [no longer included the AWS SDK by default](https://aws.amazon.com/blogs/compute/node-js-18-x-runtime-now-available-in-aws-lambda/)—a sensible decision perhaps, but one with significant implications for my project. The deployment size of my Lambdas quadrupled from around one megabyte to four megabytes because I had designed my solution assuming access to the provided AWS SDK in the runtime environment.

To address this issue, I had to upgrade to [v3 of the AWS SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)—a move aimed at reducing Lambda sizes but one which also led to increased cold start times. This upgrade was far from trivial; it necessitated rewriting every piece of code interacting with AWS services in some way due to the different programming model introduced by the SDK v3. The effort spanned [weeks](https://github.com/goldstack/goldstack/pull/351)—time carved out from weekends here and there—resulting in a solution with identical functionality as before but now compatible with AWS's new requirements.

This experience underscores how serverless cloud-based systems can become burdensome rather than liberating for developers. The need for constant updates simply to keep systems operational raises questions about sustainability and long-term viability in an environment where change is relentless and often forced upon us by service providers' decisions.

## The Quest for Sustainable Systems

It's always easier to highlight flaws than to craft solutions, particularly in our complex tech industry. I must admit that I don't have a silver bullet to offer as an alternative to cloud computing and serverless architectures. We've experienced the limitations of monolithic systems, and they too fell short of our expectations. It seems neither serverless nor on premise monolith is the definitive answer; hopefully the solution we seek is still out there, waiting to be discovered.

In our pursuit of more sustainable systems, it's crucial to challenge ourselves to keep this questions in mind: how do we build technology that endures? One interesting observation comes from looking at the lifespan of [companies](https://www.researchgate.net/publication/315061648_The_drivers_of_firm_longevity_Age_size_profitability_and_survivorship_of_Australian_corporations_1901-1930) and technologies. Counterintuitively, it's often the older, seemingly outdated technologies that stick around the longest. For example, mainframe computers, first introduced in the 1950s, are still in use today, running critical processes for banks and airlines.

This phenomenon suggests that chasing after the latest trends may not be our best strategy if we aim for longevity. The newest tech on the block might be more prone to becoming obsolete quickly compared to its older counterparts that have stood the test of time.

As an industry fixated on innovation, we often rush towards using services in their alpha or beta stages—enticed by cloud providers' promises of cutting-edge capabilities. However, this eagerness can lead us down a path where our creations are transient by nature—destined for obsolescence before they've had a chance to mature.

The solution remains elusive but acknowledging these patterns is a step towards finding it. We need to balance innovation with sustainability and consider how new technologies will fit into long-term strategies. While we may not have all the answers now, I remain hopeful that as an industry, we will eventually find a way to build systems that are not only useful but also built to last.

