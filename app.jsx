// import { render } from "inferno";
// Use hydrate over render, so as to wipe the contents of the target element
import { hydrate } from "inferno-hydrate";
import kebabCase from "lodash/kebabCase";

const dataTags = [...document.querySelectorAll("[data-tags]")];
dataTags &&
  dataTags.forEach(d => {
    let componentType = d.getAttribute("data-tags");

    try {
      const data = JSON.parse(d.innerHTML);
      // console.log(data);

      // Probably could lodash this if I used my brain
      let tags = {};
      data.forEach(datum => {
        if (datum.includes(":")) {
          let split = datum.split(":");
          if (split.length === 2) {
            tags[split[0]] = tags[split[0]] ? tags[split[0]] : [];
            tags[split[0]].push(split[1]);
          }
        }
      });
      // console.log(tags);

      let html = <p>No component type set by the data-tags attribute.</p>;

      if (componentType === "free-from") {
        html = (
          <ul class="free-froms">
            {tags["free_from"].map(t => (
              <li class={`free-from ${kebabCase(t)}`}>{t}</li>
            ))}
          </ul>
        );
      }

      d.removeAttribute("hidden");
      hydrate(html, d);
    } catch (e) {}
  });
