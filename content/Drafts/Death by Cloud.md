

Please help me write my article, DES by cloud how to build brittle systems. You are a highly knowledgeable senior software engineer and architect and you respond in British English only. I provide you with notes what all should be included in the article and I'll ask you to draft the article from these notes, following them as much as possible, but adding additional information and making things coherent and flow better as and when required.

Also keep in mind
- be clever, keep it intelligent and witty; make it memorable, amusing, heartfelt and captivating.
- diligently checked for grammatical mistakes 
- clear, use plain understandable language and use simple words when possible
- concise
- use short sentences
- avoid unnecessary words
- avoid repetition
- ensure there is a good flow between sentences and paragraphs
- try to explain a lot with only a few, simple word.
- be conversational but not too casual
- avoid pathos and fluffy language. 
- Respond in British English only. 
- Never output headings as bold text (**), instead output them as Markdown headings, starting with level 2 heading (##)

Here some context:

- The example I talk about is from the project Goldstack - please include a link to [Goldstack](https://goldstack.com)

Here the notes:

I used to love the idea of serverless computing using cloud-based solutions. It was promised to us as a way to build systems faster and to make them easier to maintain. I would say, sign me up! And over the past few years, I've written quite a number of articles on serverless technologies and provided others help with being able to use them in an easy way. But unfortunately, over time, I realized more and more that serverless and cloud computing is not everything it is hyped up to be. Specifically, I found a number of problems and please have them all in their own heading. First heading, infrastructure complexity. Here it is that sometimes it's easier to write the code for serverless applications, but oftentimes the infrastructure required to run this code becomes a lot more common. And even for simple solutions, one often needs hundreds of lines of terraform code, such as for building a simple API gateway with lambdas behind it. The second heading is costs. And there's already been plenty of articles written about that. Please mention here some authors and articles that you are aware of. And I don't want to really repeat too much in this section, but just mention that this is something that's already been discussed, specifically that serverless, although it was shown to us as something that is cheaper, actually turns out as something that's often way more expensive than alternative approaches.

The next heading is something along the lines of service evolution with no backwards compatibility. So this is about cloud providers deprecating services or versions of services they have developed. There's really plenty of examples to it, such as AWS Aurora Serverless 1 or the various runtimes that AWS Lambda does not support anymore. And here generally, when a cloud service deprecates a service, then although you can kind of continue using it for a while, it's not a very good option and you need to rewrite your software to make it work with the new versions of the service, which can often be very labor-intensive. More on that in an example later in the article. Next heading is integration complexity or library hell. And this is about that many cloud services, they have an enormous amount of features such as AWS S3, which sounds in principle like a simple service, just something where you can store data and retrieve it. But over time, it has grown into something of a monstrosity where you have literally hundreds of features that run off the service. And now if you want to integrate with it and you want to use the provided SDKs, these are necessarily very complex and very large because of the nature of the service that they are supposed to help you with. So even if you just want to do a simple thing, just upload the data into a bucket and read it, you easily end up with hundreds of thousands of lines of library code that your application needs to use or have included in order to use this very small facet of the service. Now, I know that AWS, for instance, in their version 3 of their JavaScript SDK, say that they have optimized the library to not include any unused code. However, in practice, when I looked at it, that didn't really seem to be the case. And even when using tree shaking, library sizes were still enormous in comparison to the features used. Now, at the same time also, these libraries that then depend on other libraries and include lots of different dependencies also require us to do security patching for when any vulnerability is found in any of the packages, which then forces us to update our software frequently.

With all these problems in mind, I think it is also worth noting that there is something that I still see as a major benefit of serverless, even now, and cloud computing, and that is much enhanced security, which is just based on the fact that in serverless or more cloud-based solutions, your components are much more isolated, or they are more easier to isolate, and thus make it much more difficult to penetrate a whole system. So, for instance, if you have just one machine on which your files are stored, your database is running, your application server is running, one small exposure can lead to the exposure of your whole system, whereas in a cloud-based solution, where you have one service for your data storage, another service for some of your compute, and yet another service for your database, it is much more challenging to compromise all these at the same time.

Now though, among all these problems that I have mentioned, one is really one that worries me the most. And that is that the systems that we build in this serverless cloud-based way, they become really transient in nature. They are not lasting. They are the opposite of lasting. I don't know what the right word for it is. Maybe find it. Or fleeting. Maybe they are fleeting. And now, since these systems are not built to last, we need to put in constant effort to keep them operational. And this really worries me because one of the benefits of serverless that was proported was that these systems actually require less ongoing maintenance because the service provider would take care of lots of the layers of the infrastructure for us that we don't need to worry about now anymore. Which is still true, but I think over time it emerged that there are other factors then which make that more difficult for us.

Now, just for a broad experiment, we can compare a modern cloud-based solution with some embedded software that's running some manufacturing machine. Now, some of these, they run on software that's literally decades old, and it is still working. With this modern serverless cloud-based system, it would really require a major overwork every few years at last to keep it operational. I would also like to give an example here about my own little project that I'm maintaining in my own time, which I think is a nice little microcosmos and much more clear-cut than any examples that I would know from more complex work environments.

So here's the example. Sometimes last year, I think around November, I got a notice from AWS that it won't be possible for me to update the Lambda functions in my solution anymore, since they've been implemented using Node 16, and AWS is phasing off support for Node 16 Lambda runtimes. Now, first, I updated the code and all the build logic for my application to Node 18, which required changing dozens of Lambdas, updating the infrastructure, and then dealing with various code incompatibilities. But overall, this was not too bad, just took a couple of days. Now, though, I realized that also in the new Lambda runtime for Node 18, AWS doesn't provide the AWS SDK anymore, which is probably for good reason. But in any case, for my specific solution, this means that the code size of the Lambdas that I deploy ballooned from around one megabyte to four megabytes, since I had developed my solutions in mind with that I could use the existing AWS SDK that's provided by the runtime. Now, based on that, I now needed also to upgrade the AWS SDK to version three in order to reduce the sizes of my Lambdas, which resulted in significant increases in cold start times. And now upgrading to the new AWS SDK, since it's based on a completely or a quite different paradigm, required literally changing every line of code that interacted with AWS in some way, which took a long time. Overall, this took me weeks of effort, you know, not full time effort, but time spent on the weekend here and there. In any case, resulting in a solution that has exactly the same functionality as before, just now being compatible with the new version that AWS has required me to do.

It's always easy to point out something that's not as good as it could be and to point out problems, especially in our messy industry. However, I think it's much more difficult to propose something better. And I must say, unfortunately, here, I don't think that I have the answer or that I could propose, you know, how we could solve this problem with something other than cloud computing and serverless approaches that just works better. We have tried the whole monolith thing, and it also didn't really work out for us. So I don't think that it's either of these two approaches, but probably something else that we haven't quite discovered. However, I think in general, it's good for us to have this problem at the forefront of our mind. How can we build systems that are built to last? And just one thing to consider for this is an important law that is derived from the longevity of both companies and technologies. Here, it was noticed that actually it was old companies and technologies that stayed with us the longest. So generally, we would think that the new and shiniest thing that this, of course, will be deprecated way well after the old outdated tech that we have been using before. But in actuality, it's different that actually the old outdated tech is much more likely to stay with us for a long time. And maybe you can add some examples for this if you can. And yeah, I think, and definitely here, I think as an industry, as long as we keep on chasing for new, shiniest things, trying to use the alpha preview versions of services that cloud providers propose to us, then we will set ourselves up to building systems that don't last very long. However, I think there's just one of many factors that we need to keep in mind. And as I said, I don't think we have found a solution, but I'll be very interested to see when we finally get it.

---

## The Alluring Mirage of Serverless Computing: A Cautionary Tale

Once upon a time, I was utterly beguiled by the siren song of serverless computing. The cloud-based panacea promised to expedite system development and streamline maintenance—a developer's dream! I eagerly penned numerous articles championing serverless technologies, guiding others through the labyrinthine paths of cloud adoption. Yet, as the wheel of time turned, a creeping realisation dawned on me: serverless computing was not the silver bullet it was touted to be.

### Infrastructure Complexity: A Gordian Knot

The allure of simplicity in coding for serverless applications often masks a more insidious complexity. Beneath the surface lies an intricate web of infrastructure requirements that can leave one tangled in reams of Terraform code. Crafting something as ostensibly straightforward as an API gateway with Lambdas becomes an odyssey through hundreds of lines of configuration. It's akin to building a Rube Goldberg machine when all you wanted was a lever and fulcrum.

### Costs: The Emperor's New Clothes

The topic of serverless costs has been well-trodden ground by many esteemed authors before me. Rather than belabour the point, suffice it to say that what was once heralded as cost-effective has frequently proven to be quite the opposite—a wolf in sheep's clothing promising savings but devouring budgets whole.

### Service Evolution: Chasing Shadows

Cloud providers have an Achilles' heel: their penchant for deprecating services without backward compatibility. Tales abound—from AWS Aurora Serverless v1's swansong to the obsolescence of various AWS Lambda runtimes—of forced migrations and laborious rewrites. It is akin to renovating a house only to find that the foundations are periodically whisked away.

### Integration Complexity: Navigating Library Hell

Imagine venturing into a labyrinth where each turn reveals another corridor lined with features—this is what integrating with services like AWS S3 feels like. With its Herculean feature set comes an equally bulky SDK, bloated with code your application may never need. Even AWS's promise of streamlined libraries in their JavaScript SDK v3 seems more mirage than oasis when faced with library sizes disproportionate to feature usage.

Despite these tribulations, there remains a beacon of hope in serverless computing—the enhanced security born from component isolation. Like fortresses dotting a landscape, each service stands alone, making systemic breaches far more arduous for would-be invaders.

## Transience: Building Castles in the Cloud

Yet among these challenges looms one particularly disquieting spectre—the fleeting nature of our serverless creations. These systems are ephemeral; they defy permanence, demanding constant vigilance and adaptation just to persist in operational limbo.

Consider Goldstack ([Goldstack](https://goldstack.com)), which serves as my personal microcosm for these industry-wide issues—a testament to how even small projects can encapsulate grander challenges.

When AWS announced Node 16's retirement from Lambda runtimes, it triggered a cascade effect within my project—code updates, infrastructural upheavals, and compatibility conundrums—all culminating in weeks spent merely preserving functionality amidst shifting sands.

## In Search Of Permanence In A Digital Age

Highlighting flaws is child's play; proposing viable solutions is where true craftsmanship lies. Alas, I have no panacea for our collective quandary; neither monoliths nor microservices have delivered salvation from impermanence.

Yet there is wisdom in longevity—an observation that often it is not the newest technology but rather enduring legacy systems that stand the test of time. Perhaps this paradox offers us guidance; perhaps our relentless pursuit of novelty is our undoing.

In conclusion, while we may not yet hold the key to building lasting systems within this ever-evolving digital cosmos, keeping this challenge at the forefront might eventually lead us towards solutions that endure beyond fleeting trends and ephemeral architectures. And when that day comes—as I believe it must—I'll be most eager indeed to witness what form such lasting innovation will take.
