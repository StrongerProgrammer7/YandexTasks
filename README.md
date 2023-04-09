# YandexTasks
This work include: Template Engine, using i8n with replace to Intl API, Rotate blocks, Async render

#### Every folder include condition for every task
<div>
<h4>Task "Template engine": </h4>
Thanks for base solution user: <a href="https://github.com/Fanzholl/Shablonizator">@Fanzholl</a>. 
<br>I merely refined his solution. Specifically, I added the execution according to the levels
</div>
<div>
<h4>Task "Async render": </h4>
I got next error: 
<pre>

 /temp/executing/run.js:21
resultPromise.then((result) => {
              ^

TypeError: resultPromise.then is not a function
    at Object.<anonymous> (/temp/executing/run.js:21:15)
    at Module._compile (node:internal/modules/cjs/loader:1120:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1174:10)
    at Module.load (node:internal/modules/cjs/loader:998:32)
    at Module._load (node:internal/modules/cjs/loader:839:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47

Node.js v18.7.0
make: *** [Makefile:8: run] Error 1</pre>
#### But my compiler give me next answer: ['B', 'A', 'B.1', 'B.2', 'B.3', 'A.1', 'A.1.1', 'B.4', 'B.5', 'B.6']
#### Correct answer: ['B', 'A', 'B.1', 'B.2', 'B.3', 'A.1', 'B.4', 'A.1.1', 'B.5', 'B.6']
</div>
