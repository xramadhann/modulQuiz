function showStage(stageNum, clickedButton) { // Tambahkan parameter clickedButton
    // Hide all stages
    const stages = document.querySelectorAll('.stage');
    stages.forEach(stage => stage.classList.remove('active'));
    
    // Remove active class from all buttons di nav utama
    const buttons = document.querySelectorAll('.nav-container .stage-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected stage
    document.getElementById('stage' + stageNum).classList.add('active');
    
    // Add active class to clicked button
    clickedButton.classList.add('active'); // Perbaikan: menggunakan parameter
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSubStage1(stageId, clickedButton) {
    // 1. Kelola Kelas Tombol (Menandai tombol yang aktif)
    const parentNav = clickedButton.parentElement;
    const buttons = parentNav.querySelectorAll('.stage-btn');
    
    // Hapus kelas 'active' dari semua tombol sub-nav
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Tambahkan kelas 'active' pada tombol yang baru diklik
    clickedButton.classList.add('active');

    // 2. Kelola Tampilan Konten Sub-Bab
    // Asumsi: Konten sub-bab berada di dalam 'stage1'
    const stageContainer = document.getElementById('stage1');// Ganti sesuai dengan stage yang sesuai
    
    // Dapatkan semua konten sub-bab    
    const contents = stageContainer.querySelectorAll('.sub-stage-content');

    // Sembunyikan semua konten sub-bab dengan menghapus kelas 'active' dan menyetel display: none
    contents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });

    // Tampilkan konten sub-bab yang sesuai dengan stageId
    // Konten ID: subStage1_content, subStage2_content, dst.
    const targetContentId = 'subStage1_' + stageId + '_content';
    const targetContent = document.getElementById(targetContentId);

    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block'; // Tampilkan konten yang dipilih
    } else {
        console.error('Konten dengan ID ' + targetContentId + ' tidak ditemukan.');
    }
    
    // 3. Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSubStage2(stageId, clickedButton) {
    const parentNav = clickedButton.parentElement;
    const buttons = parentNav.querySelectorAll('.stage-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');

    const stageContainer = document.getElementById('stage2');
    const contents = stageContainer.querySelectorAll('.sub-stage-content');

    contents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });

    const targetContentId = 'subStage2_' + stageId + '_content';
    const targetContent = document.getElementById(targetContentId);

    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
    } else {
        console.error('Konten dengan ID ' + targetContentId + ' tidak ditemukan.');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSubStage3(stageId, clickedButton) {
    const parentNav = clickedButton.parentElement;
    const buttons = parentNav.querySelectorAll('.stage-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');

    const stageContainer = document.getElementById('stage3');
    const contents = stageContainer.querySelectorAll('.sub-stage-content');

    contents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });

    const targetContentId = 'subStage3_' + stageId + '_content';
    const targetContent = document.getElementById(targetContentId);

    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
    } else {
        console.error('Konten dengan ID ' + targetContentId + ' tidak ditemukan.');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function checkQuiz(subStageContentId) {
    // 1. Targetkan kontainer soal (substage) secara spesifik menggunakan ID yang dikirim
    const stage = document.getElementById(subStageContentId); 
    
    if (!stage) {
        console.error('Kontainer soal dengan ID ' + subStageContentId + ' tidak ditemukan.');
        return;
    }
    
    const questions = stage.querySelectorAll('.question-card');
    
    let correctCount = 0;
    let attemptedCount = 0; 
    let totalAvailableQuestions = questions.length;
    
    questions.forEach((question) => {
        const options = question.querySelectorAll('.option');
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        
        // Reset previous styling sebelum cek
        options.forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
        });
        
        if (selectedOption) {
            attemptedCount++; 

            const selectedLabel = selectedOption.parentElement;
            const correctOption = question.querySelector('[data-correct]').parentElement;
            
            if (selectedOption.parentElement.querySelector('[data-correct]')) {
                selectedLabel.classList.add('correct');
                correctCount++;
            } else {
                selectedLabel.classList.add('incorrect');
                correctOption.classList.add('correct');
            }
        }
    });

    
    // Tentukan total yang akan digunakan untuk perhitungan skor
    const totalQuestionsForScore = (attemptedCount > 0) ? attemptedCount : totalAvailableQuestions;
    
    // Calculate percentage
    const percentage = (correctCount / totalQuestionsForScore) * 100;
    
    // Targetkan div hasil
    const resultDiv = document.getElementById('result_' + subStageContentId); 
    
    let feedback = '';
    let emoji = '';
    
    if (percentage >= 90) {
        feedback = 'Luar biasa! Kamu sangat memahami materi ini! 🌟';
        emoji = '🎉';
    } else if (percentage >= 70) {
        feedback = 'Bagus sekali! Terus tingkatkan pemahaman Anda! ✨';
        emoji = '👏';
    } else if (percentage >= 50) {
        feedback = 'Cukup baik! Mari pelajari lagi untuk hasil yang lebih baik! 💪';
        emoji = '📚';
    } else {
        feedback = 'Tetap semangat! Ulangi materi dan coba lagi! 🌸';
        emoji = '💖';
    }
    
    resultDiv.innerHTML = `
        <h3>${emoji} Hasil Kamu ${emoji}</h3>
        <div class="score">${correctCount}/${totalQuestionsForScore}</div>
        <div class="score-text">Nilai: ${percentage.toFixed(0)}%</div>
        <div class="feedback">${feedback}</div>
    `;
    resultDiv.classList.add('show');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function resetQuiz(subStageContentId) {
    // Menargetkan kontainer soal berdasarkan ID unik yang dikirim
    const stage = document.getElementById(subStageContentId);

    if (!stage) {
        console.error('Kontainer soal dengan ID ' + subStageContentId + ' tidak ditemukan.');
        return;
    }
    
    const radios = stage.querySelectorAll('input[type="radio"]');
    const options = stage.querySelectorAll('.option');
    // Menggunakan ID hasil yang unik
    const resultDiv = document.getElementById('result_' + subStageContentId);
    
    // Clear all selections
    radios.forEach(radio => radio.checked = false);
    
    // Remove styling
    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    // Hide result
    if (resultDiv) {
        resultDiv.classList.remove('show');
    }
    
    // Scroll to top of stage
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Add accessibility: keyboard navigation for options
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.querySelector('input[type="radio"]').click();
        }
    });
}); 