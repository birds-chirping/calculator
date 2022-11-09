const btnContainer = document.querySelector('.buttons-container');

const btnData = [['sign', '+/-'], ['clear', 'C'], ['del', "\u232B"], 
                 ['n7', 7, 'num'], ['n8', 8, 'num'], ['n9', 9, 'num'], ['divide','/', 'op'],
                 ['n4', 4, 'num'], ['n5', 5, 'num'], ['n6', 6, 'num'], ['mul', '*', 'op'],
                 ['n1', 1, 'num'], ['n2', 2, 'num'], ['n3', 3, 'num'], ['sub', '-', 'op'],
                 ['fpoint', '.'], ['n0', 0, 'num'], ['equal', '='],['add', '+', 'op'],
                ];

btnData.forEach(b => {
    let btn = document.createElement('button');
    btn.setAttribute('id', b[0]);
    if (b[2]) { btn.classList.add(b[2]);}
    btn.textContent = b[1];
    btnContainer.appendChild(btn);
})