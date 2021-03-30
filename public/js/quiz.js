var quiz = (function() {
    return {
        // Main functionality.
        // argument: "quizId", the id of the quiz (use the "data-id" attribute of the main HTML element).
        // argument: "url" (optional), the address where to send the result.
        handle: function(quizId, url) {
            // "sent" flag, prevents answering multiple times
            var sent = false;
            // The quiz HTML element.
            var quizElement = document.querySelector('div[data-id="' + quizId + '"]');
            // The list of answer buttons.
            var answerButtonList = quizElement.querySelectorAll('[data-answer]');
            // The result HMML element.
            var resultElement = quizElement.querySelector('div.quiz-result');
            // The HTML elementw hich will display the selected answer.
            var resultAnswer = resultElement.querySelector('span.quiz-answer');

            // Iterate answer button list.
            answerButtonList.forEach(function(answerButton) {
                // Set on click handler
                answerButton.addEventListener('click', (event) => {
                    if (sent) {
                        // Quiz was already answered, stop.
                        return false;
                    }
                    // The value of the answer.
                    var answer = event.target.dataset.answer;
                    // Set answered button as active.
                    event.target.classList.add('active');
                    // Set the selected answer value to display.
                    resultAnswer.textContent = answer;
                    // Show the result HTML element.
                    resultElement.style.display = 'block';
                    // Set the "sent" flag.
                    sent = true;

                    if (!url) {
                        // No url argument, stop.
                        return;
                    }

                    // External data sending functionality.
                    // Send the answer to an external URL.
                    const promise = new Promise(
                        (resolve, reject) => {
                            // Create a form element.
                            const formData = new FormData();
                            // Set the answer value.
                            formData.append('answer', answer);
                            // Fetch the extrnal url.
                            fetch(
                                url, {
                                    method: 'POST',
                                    body: formData
                                }
                            ).then(
                                response => {
                                    resolve(response);
                                },
                                reject => {
                                    // Log the error
                                    console.log(reject);
                                }
                            );
                        }
                    );
                    promise.then(
                        result => {
                            // Log the result.
                            console.log(result);
                        }
                    ).catch(
                        error => {
                            // Log the error.
                            console.log(error);
                        }
                    );
                });
            });
        }
    }
})();
