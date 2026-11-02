// CloudFront Function (runtime: cloudfront-js-2.0, event: viewer request).
// Gives the site clean URLs while the files in S3 keep their .html names:
//   /experience        -> serves experience.html
//   /experience.html   -> 301 redirect to /experience
//   /experience/       -> 301 redirect to /experience
//   /                  -> left alone (CloudFront's default root object serves index.html)
// Files with an extension (styles.css, assets/*.svg, the résumé PDF) pass through untouched.
// This file is AWS configuration, not part of the website; don't upload it to S3.

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: { location: { value: location } },
  };
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri === "/index.html") return redirect("/");
  if (uri.endsWith(".html")) return redirect(uri.slice(0, -5));
  if (uri.length > 1 && uri.endsWith("/")) return redirect(uri.slice(0, -1));

  var last = uri.split("/").pop();
  if (uri !== "/" && last.indexOf(".") === -1) request.uri = uri + ".html";

  return request;
}
