# Giphy UI

## Project setup
```
npm install
```

### Compile and hot-reload for development (use this to test the application)
```
npm run serve
```

### Compile and minify for production
```
npm run build
```

### Run unit tests
```
npm run test:unit
```

### Update snapshot tests
```
npm run test:snapshots:update
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Read before evaluating

What I would like to clarify is that tasks of this type are always quite problematic for developer. It is always ambiguous
what is required to be shown - the skill to write application without reinventing the wheel or show your knowledge of core
languages and APIs in vanilla setup. My choice was to not reinvent the wheel and use available ecosystem to try to show
the practices that I believe are a sign of experience and seniority of a developer.

Here's some elaboration on chosen technologies/frameworks/libraries:
   * **Vue** - I have heavy experience with Angular/AngularJS and Vue, and less heavy with React. The choice was driven by the
     fact that Vue experience is the most recent and it is pretty decent framework. It can handle the task pretty well 
     and it has pretty solid eco-system, plus it integrates with most modern technologies pretty well. Vue CLI makes demoable
     project setup pretty easy, though two other frameworks also have decent CLI's (Angular one generates pretty verbose
     output though). It's fast, it has solid concepts, it has options to keep good separation of concerns (unlike React)
     and it has decent tools and IDE support. In Vue I've also made a choice to go with .vue format instead of .tsx cause
     I feel it promotes better separation of concerns in a lot of cases, but in general I do see value in using TSX as it
     can promote better re-usage of concepts.
   * **Vuex** - It's not the best store library that I've worked with, but it's the most supported out of the box choice 
     for Vue, that's why I've chosen for it instead of trying to go for Redux or other solution. I'm not a big fan of Vuex
     due to it's very prescriptive nature and some weird design choices, but it was a place for compromise.
   * **TypeScript** - I'm a big fan of TypeScript, having 15 years of experience with JavaScript I've learned to love and hate
     it at the same time. There are definitely good things to say about it, but in essence TypeScript is an effort to add
     the main thing missing from it - maintainability. I'm gonna be blunt here but I don't believe the debate about static
     typing vs dynamic typing should be valid anymore. There are cases where dynamic typing is your friend and one of those
     is rapid prototyping, but when it comes to building large applications you will appreciate static typing to full extent
     especially as maintainer of those. Ideally I would of course go for something with even stronger static typing like
     ReasonML or even better Elm, but my production experience with both of them is lacking so it would clearly be a bad
     choice for this task.
   * I've chosen for very basic linting cause I'm already used to linting we use in my current company and airbnb rules
     were too distracting from building solution and focusing on minor anti-patterns. Normally I just follow the rules
     setup within the company and try to contribute to their development.
   * I've chosen for **vue-class-component, vue-property-decorator, vuex-class and vuex-module-decorators** to show my
     believe in aspect oriented programming and love of TypeScript/ES6 decorators. I believe separation of concerns that
     this can provide is a very useful practice in software development. I promotes code readability, accessibility for
     tools and improves testing. Unfortunately **vuex-module-decorators** also forced me to make one compromise - inverse 
     the dependency direction between parent store and module, which is ugly but due to lack of better tools atm I've 
     chosen for it. Not all of these libs were totally familiar to me so there might be some deviations from best practices
     of them here and there.
   * **axios** - I definitely know how to use XMLHttpRequest directly, but decided to avoid all the boiler plate of it and
     go with the library that is most commonly used with Vue these days.
   * **inversify-props** - One of the choices that might be perceived weird in front end community is to go for dependency
     injection, and I think AngularJS is a lot to blame for creating a bad image for it. I still believe it's a good concept
     and in situations where instantiation of objects is not under your control (like Vuex store and Vue components) it
     plays important role. In general I believe it promotes better testing and better reusability of your code.
   * **SCSS** - I went with using a bit of SCSS to be able to use Vue Material lib. In all honesty I'm pretty comfortable
     working with vanilla CSS, but I do see merits in SASS, SCSS, LESS and others.
   * **Vue Material** - One of the most controversial choices in this solution was using **Vue Material** which is a beta.
     In general I didn't want to bother about all the aspects of visualisation and go all the way making designs my self.
     When building application I prefer to focus on building logic of application and interaction, not tiny details of
     it's design. Normally companies have well defined design systems that are used internally to build UIs and application
     developers don't develop much of the design themselves, instead it's a task of component developer. Unfortunately
     **Vue Material** does not come with TS support and has some other issues that need additional configuration and require
     me to use @ts-ignore directive. But in the end it did remove the distraction of needing to design things and eased
     development for me quite a lot. I could have used more mature **Vue Bootstrap** library, but I find material design
     concepts way more solid and visually appealing.
   * **intersection-observer and vue-observe-visibility** - I've decided to use IntersectionObserver api (with a polyfill)
     and it's integration into vie to achieve infinite scrolling and lazy image loading. I understand that it probably have
     been a goal to see understanding of this API (which I have) but I don't see point reinventing the wheel here.
   * I've decided to go with **snapshot testing** for markup of Vue components. I don't really believe in big value in
     explicit asserts over component generated markup, instead I think snapshot testing can give you good impact estimation
     when making changes.
   * I'm also not a big believer in JSDoc, comments and such for projects of such type. I believe your first choice should be
     well written and self descriptive code. Your second choice is having good tests suite that describes use cases. And
     lastly you should use your version control system to provide good commit comments that describe why you change or add
     things to your code. The only good usecase for JSDoc and extensive documentation is for building libraries and APIs
     consumed by external customer to your team or even department.

Some explanation what was inside deliverables, what is not and some other choices:
   * Due to lack of time and a bit of controversy of the feature for choosing 1 or 3 columns layout I decided to skip it.
     The controversy is to design it properly because it is very much on the edge of mixing concerns. It also requires
     some tedious exploration of Giphy API and adjusting the visual layout to be able to match 1 and 3 column image sizes.
     I don't see much challenges implementing it technically but I see a challenge to implement it in a way to demonstrate
     good coding practices in such short amount of time. If you are interested to see my skills in that regard you can
     always check one of my past projects - http://www.vergelijk.nl (specifically listing page - https://www.vergelijk.nl/jassen/)
     where I was implementing responsive multi column layout that differs in different screen sizes and different states.
     If there are doubts I can always find people from that company who can confirm my work on that feature.
   * Instead of previous feature I've added more useful feature for usability and performance of the page - lazy image
     loading. I've used intersection observing to also initialise images only when they are in the view.
   * I've made app a little bit responsive but I did not spend too much time in making it perfect or something. I just used
     what **Vue Material** library could offer.
   * I did not try to optimize the size of the resulting JS and CSS bundle either, and it is affected by including the whole
     **Vue Material** library. I could have done explicit imports only of the components I'm using, but this was the compromise
     due to lack of time and specifics of that library.
   * I'm using Mac so I've tested Safari but not IE (I don't have virtualbox here and it's gonna take time to install it).
     My assumption is that Edge should work.
   * In testing I use some mocking, but I personally consider mocking an anti-pattern and code smell. Unfortunately most
     of the time and particularly in the front end it's not possible to completely avoid it. For that matter some people
     familiar with Vue testing might notice I don't use **localVue** test util but use real Vue object. It's just a matter
     of preference to not mock things.
   * As mentioned before due to using **vuex-module-decorators** library which I very much liked I had to go with a pretty
     bad code design choice and have inverse direction of dependency where Vuex store module depends on parent store and 
     creates pretty bad coupling. It's a compromise that doesn't hurt such small app but something that would not be 
     acceptable in bigger application. I would need to explore Vue eco-system a bit more to find solution with same 
     elegance but better choice in this regard, so I made a compromise here.
   * People who know Vue might notice I don't use two way data binding, specifically v-model directive. This is intentional
     as I believe it's a bad design pattern and I prefer to split towards properties and events, and Vue simply allows to
     do this very easily.
   * I intentionally did not use **await** keyword when testing actions in Vuex store, because I wanted to make asserts
     on storing loading state in the store.
