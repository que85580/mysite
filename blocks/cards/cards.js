import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    
    // Move all children of row to li
    while (row.firstElementChild) li.append(row.firstElementChild);
    
    // Loop through the children of li
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });

    // Create the social links div and append to li
    const socialLinksDiv = document.createElement('div');
    socialLinksDiv.className = 'social-links';

    const socialLinks = [
      { href: '#', title: '', iconClass: 'icon-facebook' },
      { href: '#', title: '', iconClass: 'icon-twitter' },
      { href: '#', title: '', iconClass: 'icon-instagram' }
    ];

    socialLinks.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.title = link.title;
      a.className = 'button-icon';
      
      const span = document.createElement('span');
      span.className = `icon ${link.iconClass}`;

      a.appendChild(span);
      socialLinksDiv.appendChild(a);
    });

    li.appendChild(socialLinksDiv);  // Append the social links to li
    ul.appendChild(li);  // Append li to the ul
  });




  ul.querySelectorAll('picture > img').
  forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  debugger;
  
  block.append(ul);
}


