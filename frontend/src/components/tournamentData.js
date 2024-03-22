// tournamentData.js

import AbstractComponent from "./AbstractComponent.js";

export default class extends AbstractComponent {
    constructor() {
        super();
        this.setTitle("Tournament Data");
    }

    async getHtml() {
        return `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pong Tournament Data</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
        .b {
            /* border: solid 1px black; */
            max-width: 750px;
            overflow: auto;
            margin: 0 auto;
            margin-bottom: 30px;
        }
        
        .title {
            text-align: center;
            color: brown;
            margin-bottom: 10px;
        }
        </style>
        </head>
        
        <body>
        
        <div class="container">
        <h1 class="display-7 title">Pong Tournament Data from Blockchain.</h1>
        <table class="table b">
        <thead>
        <tr>
        <th scope="col">Time Stemp</th>
        <th scope="col">Game 1</th>
        <th scope="col">Game 2</th>
        <th scope="col">Final</th>
        </tr>
        </thead>
        <tbody id="tournamentData">
        <!-- JavaScript로 생성될 내용이 여기에 들어갈 것입니다. -->
        </tbody>
        </table>
        </div>
        
        <div class="container">
        <div class="text-end" id="btn">
        <button type="button" class="btn btn-primary" id="goBackButton">돌아가기</button>
        </div>
        <script src="tournamentData.js"></script>
        </div>
        
        
        <!-- 부트스트랩 JavaScript 추가 (선택 사항) -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
        
        </body>
        
        </html>
		`;
    }
    // 토너먼트 데이터를 표에 채우는 함수
    populateTable(data) {

        var tbody = document.getElementById("tournamentData");
        data.tournamentLog.forEach(function (tournament) {
            var tr = document.createElement("tr");
            // Timestamp 추가
            var tdTimestamp = document.createElement("td");
            var timestamp = new Date(tournament.tournament[0].timestamp * 1000);
            var options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            };
            var formattedTimestamp = timestamp.toLocaleDateString('en-GB', options).replace(/\//g, '.').replace(",", "");
            // var formattedTimestamp = timestamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).replace(",", "");;
            tdTimestamp.textContent = formattedTimestamp;
            tr.appendChild(tdTimestamp);

            // 플레이어 데이터 추가
            for (var i = 1; i < tournament.tournament.length; i++) {
                var tdPlayer = document.createElement("td");
                var playerA = tournament.tournament[i].playerA.name + " " + tournament.tournament[i].playerA.score + " " + (tournament.tournament[i].playerA.score > tournament.tournament[i].playerB.score ? "W" : "L");
                var playerB = tournament.tournament[i].playerB.name + " " + tournament.tournament[i].playerB.score + " " + (tournament.tournament[i].playerB.score > tournament.tournament[i].playerA.score ? "W" : "L");
                tdPlayer.innerHTML = `${playerA}<br>${playerB}`;
                tr.appendChild(tdPlayer);
            }

            // 행 추가
            tbody.appendChild(tr);
        });
    }

    // 페이지가 로드될 때 테이블을 채우도록 호출
    goBack() {
        window.history.back();
    }

    handleRoute() {
        fetch("http://localhost:8000/dashboard")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.populateTable(data);
            });

        const goBackBtn = document.querySelector("#goBackButton");
        goBackBtn.addEventListener("click", event => {
            this.goBack();
        });
    }
}
