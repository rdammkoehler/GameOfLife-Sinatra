/*
@page why 0. Why JavaScriptMVC
@tag home
<h1 class='addFavorite'>Bad developers copy. Great developers Steal!</h1>
<p>JavaScriptMVC has 'stolen' all the greatest ideas in JavaScript development and integrated them into 
one convient package.
Read how JavaScriptMVC:</p>
<ul>
    <li>enforces best practices</li>
    <li>reduces development time</li>
    <li>improves maintainability</li>
</ul>
<h2>Best Practices</h2>
<h3>Compression</h3>
<p>There is a high cost to using multiple files in a JavaScript application. Not only do you have to create and include the file, you have to make sure the file gets added to your compression or packaging scripts correctly. Even worse, you have to decide where to put the file as no standard folder organization exists.
</p>
<p>Using JavaScriptMVC, a developer can effortlessly include and compress other JavaScript files no matter how complex the dependencies. Because it's so easy, there's little incentive for developers to lazily group unrelated functionality in the same file.
</p>
<p>Include makes it simple to include and compress JavaScript files no matter how complex the dependencies. This leaves you focusing on organization with logically separated JavaScript files.
</p>
<h3>Testing</h3>
<p>Automated testing has well-known advantages, but JavaScript developers rarely write test code. In fact, JavaScript developers cite testing as their second biggest pain point in making web sites.
</p>
<p>JavaScript testing sucks. It sucks because most applications are event driven, and although libraries exist that simulate some events, none are complete. Existing test libraries are also complicated to set up and use. JavaScriptMVC's Test plugin finally makes JavaScript testing achievable by being the most comprehensive and easy to use testing suite.
</p>
<h3>Documentation</h3>
<p>Like testing, documentation is one of those things that we need to do, but avoid. 
Other than writing comments, documentation takes no extra work. 
When you compress your application, documentation is automatically generated.
</p>
[include.Doc] is very easy to customize and add features.
<h3>Error Reporting</h3>
Getting JavaScript to work perfectly across all browsers is extremely challenging, if not almost impossible. 
JavaScriptMVC sends you an email when your application breaks by integrating with the [http://damnit.jupiterit.com] service.
<h3>Updating</h3>
Automatically update JavaScriptMVC as simple as writing:
@codestart text
js jmvc\update
@codeend
<h2>Maintainability</h2>
<h3>Class</h3>
<p>[jQuery.Class] provides simple simulated inheritance in JavaScript. 
It is based off John Resig's Simple JavaScript Inheritance script. 
On top of John's Class, it provides several key features to create a more powerful 
class implementation: class level inheritance, class initialization callbacks, introspection, 
and access to the instance’s class.
</p>
<h3>Model</h3>
[jQuery.Model Models] wrap an application's data layer. This is done in two ways:
<ul>
    <li>Requesting data from and interacting with services</li>
    <li>Wrap service data with a domain-specific representation.</li>
</ul>
A strong model layer keeps your code organized and maintainable.
<h3>Controllers and Event Delegation</h3>
JavaScriptMVC's [jQuery.Controller controllers] use event delegation to organize event handlers.
<h3>Views</h3>
Views render data into a form suitable for interaction. 
In JavaScript, these are client side templates that help avoid mixing HTML and JavaScript.

 * <h2>Reduce Development Time </h2>
 * Quickly turning over a stable application is important to every developer. Although maintainability and best practices help, JavaScriptMVC has a few special features to jump start your development. 
<h3>Code Generators</h3>
JavaScriptMVC is packed with code generators. Generate application and file stubs via the command line:
@codestart text
js jmvc\generate\app email_manager
js jmvc\generate\controller emails
js jmvc\generate\model user
js jmvc\generate\test email
js jmvc\generate\page email_manager index.html
@codeend
<h3>Scaffolding</h3>
<p>Returning to 2.0 soon.</p>
<h3>Plugins and Engines</h3>
<p>Returning to 2.0 soon.</p>




 */


//break