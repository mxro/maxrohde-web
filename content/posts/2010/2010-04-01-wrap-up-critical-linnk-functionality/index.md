---
categories:
- contemplations
date: "2010-04-01"
blog: maxrohde.com
title: 'Wrap-up: Critical Linnk Functionality'
---

We have extensively tested [Linnk](http://www.linnk.de/). Stemming from this test, along with user feedback received by email, we have compiled the following list of the most wanted features:

**User Requests**

_More formatting options for text_: Linnk text items are so far only allow for plain text, without any formatting. Users have requested that further options for formatting are provided. For instance, that text can be made bold or that headings can be used for the text.

_Better support for drag and drop:_ In the current version, content can only be ‘dragged and dropped’ into Linnk but not out of Linnk. This is especially relevant for files and folders. Furthermore, drag and drop integration should be improved with different applications.

_Option to permanently delete files:_ Some users reported that they would like to have the option.

_Improve Performance when Browsing:_ Browsing some pages can be slow in Mac OS X and Windows.

**Project Team Experiences**

Besides that, our own usage revealed the following desired functionalities.

_Editing Semantic Data:_ Although Linnk creates a basic semantic web structure for documents and databases, it is not yet possible to add customized triples to the rdf documents.

_Integrated Search:_ Searching for content is a vital activity in working with knowledge. In Linnk search can enhance the speed in which users can navigate to pages. Further, a search for „resources“ can improve the composition of pages (a sidebar, in which the user can search for other documents, which then can be dragged and dropped onto Linnk).

_Tabs Management_: Opening the same database in multiple tabs can lead to data conflict (this also appears if the same database is opened on multiple workstations).

_Improve Navigation:_ Recently visited pages, favorites and a more advanced histrory can improve the speed in which the user is able to find pages.

_Introduce Feeds:_ At the moment, the user needs to manually add content to Linnk. Some types of content, however, could be added automatically to the database, and thereby receive a unique address and become part of the network. Users then does not need to add the content to the platform, but can focus on composing the information.

_Integration with Web Applications:_ One of the major usability hurdles in Linnk at the moment, is to add content from web application such as Google Docs. Users need to manually copy URLs and paste them into Linnk. Another feature that could be added is to synchronize text items with google docs ([there is a well-documented Java API](http://code.google.com/apis/documents/docs/3.0/developers_guide_java.html)).

_Support of Integration of Multiple Databases:_ Currently, Linnk supports the creation of multiple databases on one workstation. This is a useful feature, if, for instance, some of the data is supposed to be published, some synchronized and some only backed up. However, at the moment it is not possible to link documents from one database to the other.

_Integrate Search to Primary Interface:_ Linnk databases can be searched using desktop search technologies such as Google Desktop or Spotlight. However, this is a weak support for the process of composition. It would be better if the search for documents and items would be integrated into the primary interface, so that search results can be dragged and dropped and recombined to new knowledge fragments.

_Different Icons for Different Content:_ All links have the same icon and design. It would be good to represent links pointing to embedded directories, web pages, linked files, and linked Linnk documents in a distinguishing way.

_Closer Integration with Desktops on Multiple Operating Systems:_ User often place their used files to popular places such as the Desktop or ‚My Documents‘ folder. Events occurring on these places should easily be captured by Linnk (e.g. add files from these places to the feed).

_Closer Integration with Desktop Applications (E-Mail, Word processor, Web browser):_ In order to be able to easily add the data to the knowledge network, integration with Desktop applications should be deepened. For instance, Linnk can work as a simple server, who listens to context events on a dedicated port. A Firefox plugin, for instance, could send every page the user opens to this server and the page could appear in Linnk (and maybe trigger an automatic search of the database for this item - in case the user has already added this webpage to the database, the document which contains the link will be listed, along with other items in this document).

_Not every piece of knowledge needs to have a specified place in the network:_ Currently, every piece of knowledge added to Linnk must be added to a specified place in the network. This inhibits emergence. There should be mechanisms to add objects without specifying an exact place. One example could be a button “create new work context”, which triggers the creation of a new [work context](http://maxrohde.com/2010/03/30/work-contexts/).

_Allow for extensions and plugins:_ The source code of Linnk must be reorganized in order to allow extensions and plugins. For instance, the semantic web functions and the spell checker could be offered as optional plugins.

_Allow Web Service Integration:_ Linnk should be made capable of listening to events driven by web services. So a simple server could offer a web service interface, which allows other applications to call this service and send a URL. This service could for instance be called by adding an additional Invoke to a process in BPEL designer, which supports a business process.