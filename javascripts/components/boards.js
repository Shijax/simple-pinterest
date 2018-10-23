import { loadBoards } from '../data/boardsData.js';
import { loadPinsOnBoards } from '../data/pinsData.js';
import { initialPinView } from './pins.js';

const bindEvents = () => {
    $('#user-boards').on('click', '.board-card', (e) => {
        const clickedBoardId = $(e.target).closest('.board-card').attr('id');
        $('#boards-page').hide();
        $('#pins-page').show();
        initialPinView(clickedBoardId);
    })
}

const writeBoards = (boards) => {
    let domString = '';
    boards.forEach(board => {
        const boardImg = board.pins[0] ? board.pins[0].image_url : './db/default-img.jpeg';
        domString += `
      <div id='${board.id}' class="pcard board-card align-self-start p-2">
        <img class="card-img-top" src="${boardImg}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${board.name}</h5>
          <p class="card-text">${board.pins.length} Pins</p>
        </div>
      </div>
      `
    });
    $('#user-boards').html(domString);
}

const initalizeBoardView = () => {
    loadBoards().then((boards) => {
        return loadPinsOnBoards(boards);
    }).then((boardsWithPins) => {
        writeBoards(boardsWithPins);
        bindEvents();
    }).catch((error) => {
        console.error(error);
    })
}

export {
    initalizeBoardView
};