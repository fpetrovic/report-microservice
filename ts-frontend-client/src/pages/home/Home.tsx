import React from 'react'

function Home() {
    return (
        <div>
        <h1> This is the reason why react is better than Jquery</h1>

            <ol>
                <li>It elegantly separates concerns </li>
                <li>It uses virtual DOM. It will track only what is needed to be changed, not the entire DOM document.</li>
                <li>It is one-way binding street!</li>
                <li>There is only one source of the truth</li>
                <li>Example of getting id for URI: '/reports/1'</li>
            </ol>
        </div>
    )
}

export default Home
