import { wordpressPreprocess } from './wordpressPreprocess';

it('Should convert code tag links', () => {
  const input = `<!-- wp:paragraph -->
<p>CSS Modules are simply plain CSS files we can develop alongside our React components:</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"css"} -->
<pre class="wp-block-syntaxhighlighter-code">.myclass {
  padding: 10px;
}</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">declare module '*.css';</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:paragraph -->
<p>We can also provide TypeScript a few more hints about the structure of the imported data, such as by using the following declaration instead of the simple one given above:</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"jscript"} -->
<pre class="wp-block-syntaxhighlighter-code">{
 "compile": "yarn node scripts/updateReferences.js &amp;&amp; tsc --build"
}</pre>
<!-- /wp:syntaxhighlighter/code -->

[sourcecode language="java"]
         MyLinkController controller = new MyLinkController();
    &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;editorpane.addMouseListener(controller);
    &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;editorpane.addMouseListener(controller);
[/sourcecode]

[sourcecode]nohub ./test.sh &amp;[/sourcecode]

[code language="java"]
final File original = new File(pathtoyourkeystore);

System.out.println(Base64Coder.encode(

OneUtilsJre.toByteArray(new FileInputStream(original))));
[/code]

[code lang=javascript]
import { makeExecutableSchema } from &#039;graphql-tools&#039;
import { graphql } from &#039;graphql&#039;
[/code]
`;

  const res = wordpressPreprocess(input);

  expect(res).toEqual(`<!-- wp:paragraph -->
<p>CSS Modules are simply plain CSS files we can develop alongside our React components:</p>
<!-- /wp:paragraph -->

<pre><code class="language-css">.myclass {
  padding: 10px;
}</code></pre>

<pre><code>declare module '*.css';</code></pre>

<!-- wp:paragraph -->
<p>We can also provide TypeScript a few more hints about the structure of the imported data, such as by using the following declaration instead of the simple one given above:</p>
<!-- /wp:paragraph -->

<pre><code class="language-typescript">{
 "compile": "yarn node scripts/updateReferences.js &amp;&amp; tsc --build"
}</code></pre>

<pre><code class="language-java">
         MyLinkController controller = new MyLinkController();
    &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;editorpane.addMouseListener(controller);
    &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;editorpane.addMouseListener(controller);
</code></pre>

<pre><code>nohub ./test.sh &amp;</code></pre>

<pre><code class="language-java">
final File original = new File(pathtoyourkeystore);

System.out.println(Base64Coder.encode(

OneUtilsJre.toByteArray(new FileInputStream(original))));
</code></pre>

<pre><code class="language-javascript">
import { makeExecutableSchema } from &#039;graphql-tools&#039;
import { graphql } from &#039;graphql&#039;
</code></pre>
`);
});
