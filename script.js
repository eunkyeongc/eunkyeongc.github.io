// 증빙서류 등록 방법: documents 폴더에 PDF를 넣고 해당 항목의 file 값을 파일명으로 지정함.
// 예: file: "bigdata_completion.pdf"  →  documents/bigdata_completion.pdf
// 서류가 없으면 file: null 유지. 개인정보를 가린 서류만 공개 저장소에 올릴 것.
const records = {
  education: [
    {title:"빅데이터 분석 플랫폼 개발자 양성과정 수료", org:"코리아에이아이(AI)아카데미학원", date:"2026.05.07~2026.10.22", file:null},
    {title:"컴퓨터공학과 졸업, 공학사", org:"계명대학교", date:"2023", file:null},
    {title:"영어영문학과 졸업, 문학사", org:"한국방송통신대학교", date:"2006.03.01.-2009.02.25.", file:"졸업증명서_방송대_영어영문학과.JPG"},
    {title:"청소년교육학과 졸업, 교육학사", org:"한국방송통신대학교", date:"2015.03.01.-2018.02.21.", file:"졸업증명서_방송대_청소년교육학과.JPG"},
    {title:"사회복지학과 졸업, 사회복지학사", org:"한국방송통신대학교", date:"2022.03.01.-2024.02.20.", file:"졸업증명서_방송대_사회복지학과.JPG"}
  ],
  career: [
    {title:"정보컴퓨터교사, 1학년 담임", org:"영천전자고등학교", date:"2025.03.02.-2026.02.28.", file:null},
    {title:"정보화마을관리자", org:"보현산별빛포도정보화마을", date:"2014.01.01.-2020.12.31.", file:null},
    {title:"컴퓨터교육, 우즈베키스탄 동방대학교", org:"국제협력단(KOICA) 해외봉사단", date:"2001-2003", file:null},
    {title:"컴퓨터교육, 카메룬 도시개발부", org:"국제협력단(KOICA) 해외봉사단", date:"2004-2005", file:null},
  ],
  certificates: [
    
    {title:"중등 2급 정교사(전자계산)", org:"교육부", date:"2024", file:null},
    {title:"사회복지사 2급", org:"", date:"2021", file:null},
    {title:"청소년지도사 2급", org:"", date:"2020", file:null},
    {title:"한국어교원 3급", org:"", date:"2020", file:null}
  ],
  volunteer: [
    {title:"선수촌 러시아어 통역", org:"세계유니버시아드대회", date:"2026.09.23", file:null},
    {title:"사무업무 보조", org:"세계육상선수권대회", date:"2026.09.23", file:null},
  ]
};

const works = document.getElementById('works');
const panel = document.getElementById('work-panel');
const tabs = [...document.querySelectorAll('.tab')];
function render(category) {
  works.replaceChildren();
  const items = records[category] || [];
  if (!items.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = '등록된 내용이 없음';
    works.append(empty);
    return;
  }
  for (const item of items) {
    const row = document.createElement('div');
    row.className = 'work';
    for (const [key, tag] of [['title','strong'],['org','span'],['date','time']]) {
      const el = document.createElement(tag);
      el.textContent = item[key] || '—';
      if (key === 'date') el.className = 'work-date';
      row.append(el);
    }
    const proof = document.createElement('div');
    proof.className = 'proof';
    if (item.file && /^[a-zA-Z0-9가-힣_.-]+\.(pdf|jpg|jpeg|png)$/i.test(item.file) && !item.file.includes('..')) {
      const link = document.createElement('a');
      link.href = 'documents/' + encodeURIComponent(item.file);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = '서류 보기 ↗';
      link.setAttribute('aria-label', item.title + ' 증빙서류 새 창에서 보기');
      proof.append(link);
    } else {
      proof.textContent = '미등록';
      proof.classList.add('is-empty');
    }
    row.append(proof);
    works.append(row);
  }
}
function activate(tab, focus = false) {
  for (const t of tabs) {
    const active = t === tab;
    t.classList.toggle('is-active', active);
    t.setAttribute('aria-selected', String(active));
    t.tabIndex = active ? 0 : -1;
  }
  panel.setAttribute('aria-labelledby', tab.id);
  render(tab.dataset.category);
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activate(tab));
  tab.addEventListener('keydown', event => {
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== null) { event.preventDefault(); activate(tabs[next], true); }
  });
});
render('education');
