// slider stuff
const sliderData = [
    {
        title: "Headphones",
        description: "use these pretty much all day. need them for music when im coding or just trying to block out noise. bluetooth is convenient but battery always dies at the worst time",
        meta: "Frequently Used Object 1/3"
    },
    {
        title: "Glasses",
        description: "cant see without them lol. been wearing glasses since middle school. always forget where i put them down which is ironic because i need them to find them",
        meta: "Frequently Used Object 2/3"
    },
    {
        title: "Keys",
        description: "apartment + car + mailbox. try to keep them in the same spot but still manage to lose them like twice a week. the keychain is from a trip i took last year",
        meta: "Frequently Used Object 3/3"
    }
];

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const itemTitle = document.querySelector('.item-title');
const itemDescription = document.querySelector('.item-description');
const itemMeta = document.querySelector('.item-meta');

function showSlide(index) {
    // hide all slides first
    slides.forEach(slide => slide.classList.remove('active'));
    
    // show current one
    slides[index].classList.add('active');
    
    // update text
    itemTitle.textContent = sliderData[index].title;
    itemDescription.textContent = sliderData[index].description;
    itemMeta.textContent = sliderData[index].meta;
    
    // disable buttons at ends
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// button clicks
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// arrow keys work too
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// start on first slide
showSlide(currentSlide);

// set frequency bar widths from data attributes
document.querySelectorAll('.frequency-bar').forEach(bar => {
    const frequency = bar.getAttribute('data-frequency');
    bar.style.width = frequency + '%';
});

// audio player stuff
document.addEventListener('DOMContentLoaded', function() {
    const players = document.querySelectorAll('.custom-audio-player');
    
    players.forEach(player => {
        const audio = player.querySelector('audio');
        const video = player.querySelector('.waveform-video');
        const playBtn = player.querySelector('.play-btn');
        const playIcon = player.querySelector('.play-icon');
        const pauseIcon = player.querySelector('.pause-icon');
        const progressBar = player.querySelector('.progress-bar');
        const progressFill = player.querySelector('.progress-fill');
        const volumeSlider = player.querySelector('.volume-slider');
        
        // default volume at 15% so its not loud
        audio.volume = 0.15;
        if (video) video.volume = 0; // mute video its just for visuals
        
        // volume control
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audio.volume = volume;
        });
        
        // play pause toggle
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(e => console.log('play failed:', e));
                if (video) video.play().catch(e => console.log('video failed:', e));
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                audio.pause();
                if (video) video.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        });
        
        // update progress bar while playing
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = progress + '%';
        });
        
        // reset when done
        audio.addEventListener('ended', () => {
            if (video) video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            progressFill.style.width = '0%';
        });
        
        // click progress bar to seek
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * audio.duration;
            if (video) video.currentTime = pos * video.duration;
        });
    });
});

/* old version before i added the video waveforms
document.addEventListener('DOMContentLoaded', function() {
    const players = document.querySelectorAll('.custom-audio-player');
    players.forEach(player => {
        const audio = player.querySelector('audio');
        const playBtn = player.querySelector('.play-btn');
        
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
});
*/
