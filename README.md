# @webservco/simple-quiz

A JavaScript library.

Turns an HTML block of answer buttons into a one-question quiz: the first click marks the answer, shows the result and can post it to a URL.

- Requires: a browser with `fetch` and `FormData`, no other dependencies

---

## Installation

```html
<script defer src="https://unpkg.com/@webservco/simple-quiz/dist/SimpleQuiz.min.js"></script>
```

Or with npm:

```shell
npm install @webservco/simple-quiz
```

---

## Usage

The quiz needs answer elements with `data-answer`, a hidden `div.quiz-result`, and a `strong.quiz-answer` inside it.

```html
<div id="quiz-example">
    <a data-answer="1" role="button">Lorem</a>
    <a data-answer="2" role="button">Ipsum</a>
    <div class="quiz-result" style="display: none;">
        Your answer: <strong class="quiz-answer"></strong>
    </div>
</div>
```

```javascript
window.addEventListener('load', function () {
    SimpleQuiz.handle('quiz-example');
});
```

The clicked element gets the `active` class, its text is copied into `strong.quiz-answer`, and `div.quiz-result` is shown. Later clicks are ignored.

### Send the answer

```javascript
SimpleQuiz.handle('quiz-example', 'https://example.com/api/quiz', function (data) {
    // The JSON returned by the URL.
});
```

The answer is sent as a `POST` form with the fields `id` (the element ID) and `answer` (the `data-answer` value). The URL must return JSON. Errors are only logged to the console.

---

## Development

[src/index.html](src/index.html) is an example page using Bootstrap.

```shell
# Install dependencies.
npm install
# Serve the example with live reload.
npx browser-sync start --server 'src' --watch 'src'
# Create the minified file in dist/.
npm run build
# Delete dist/ and the build cache.
npm run clean
```

---

## License

[MIT](LICENSE.md)
