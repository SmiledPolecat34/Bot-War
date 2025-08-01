let move = 'STAY';
let action = 'NONE';

const statusEl = document.getElementById('status');

function sendCommand() {
    fetch('/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ move, action })
    })
        .then(res => res.ok ? statusEl.textContent = `Envoyé → ${move} + ${action}`
            : res.json().then(j => statusEl.textContent = j.error))
        .catch(err => statusEl.textContent = `Erreur : ${err.message}`);
}

document.querySelectorAll('button[data-move]').forEach(btn => {
    btn.addEventListener('click', () => {
        move = btn.dataset.move;
        sendCommand();
    });
});

document.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
        action = btn.dataset.action;
        sendCommand();
    });
});
