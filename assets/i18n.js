/* Be Right Back: strings, language list, Kashur (alien) conversion. */
var BRB = window.BRB = window.BRB || {};

/* Kashur: a 24-sign cuneiform syllabary. Words are written as hyphenated syllables
   in the source and converted to signs for display. Digits and Latin names stay as they are. */
BRB.SYL = ['ka','ki','ku','sa','si','su','ta','ti','tu','ma','mi','mu','na','ni','nu','ra','ri','ru','ha','hi','hu','ash','pe','no'];
BRB.cune = function (s) {
  var map = {};
  BRB.SYL.forEach(function (x, i) { map[x] = String.fromCodePoint(0x12000 + i); });
  return s.replace(/[a-z]+(?:-[a-z]+)*/g, function (tok) {
    var p = tok.split('-');
    for (var i = 0; i < p.length; i++) if (!map[p[i]]) return tok;
    return p.map(function (x) { return map[x]; }).join('');
  });
};

BRB.LANGS = [
  { code: 'en-GB', label: 'English (UK)', locale: 'en-GB' },
  { code: 'en-US', label: 'English (US)', locale: 'en-US' },
  { code: 'ga', label: 'Gaeilge', locale: 'ga-IE' },
  { code: 'ja', label: '日本語', locale: 'ja-JP' },
  { code: 'zh-Hant', label: '繁體中文', locale: 'zh-TW' },
  { code: 'qaa', label: null, locale: 'en' }
];
BRB.MON = {
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  ga: ['Ean','Fea','Már','Aib','Beal','Meith','Iúil','Lún','MFómh','DFómh','Samh','Noll']
};

var CC_EN = { US:'United States', USH:'US House of Representatives', UK:'United Kingdom', IE:'Ireland', FR:'France', IT:'Italy', HU:'Hungary', SK:'Slovakia', PL:'Poland', CZ:'Czechia', SI:'Slovenia', AT:'Austria', SE:'Sweden', NO:'Norway', CA:'Canada', AU:'Australia', IL:'Israel', JP:'Japan', MY:'Malaysia', IN:'India', PK:'Pakistan', BD:'Bangladesh', NP:'Nepal', AR:'Argentina', PE:'Peru', NI:'Nicaragua', CL:'Chile', CR:'Costa Rica', DO:'Dominican Republic', UY:'Uruguay', VE:'Venezuela', BO:'Bolivia', HT:'Haiti', BR:'Brazil', GH:'Ghana', MW:'Malawi', BJ:'Benin', CG:'Republic of the Congo', NG:'Nigeria' };
var CC_JA = ['アメリカ合衆国','アメリカ合衆国下院','イギリス','アイルランド','フランス','イタリア','ハンガリー','スロバキア','ポーランド','チェコ','スロベニア','オーストリア','スウェーデン','ノルウェー','カナダ','オーストラリア','イスラエル','日本','マレーシア','インド','パキスタン','バングラデシュ','ネパール','アルゼンチン','ペルー','ニカラグア','チリ','コスタリカ','ドミニカ共和国','ウルグアイ','ベネズエラ','ボリビア','ハイチ','ブラジル','ガーナ','マラウイ','ベナン','コンゴ共和国','ナイジェリア'];
var CC_ZH = ['美國','美國眾議院','英國','愛爾蘭','法國','義大利','匈牙利','斯洛伐克','波蘭','捷克','斯洛維尼亞','奧地利','瑞典','挪威','加拿大','澳洲','以色列','日本','馬來西亞','印度','巴基斯坦','孟加拉','尼泊爾','阿根廷','秘魯','尼加拉瓜','智利','哥斯大黎加','多明尼加','烏拉圭','委內瑞拉','玻利維亞','海地','巴西','迦納','馬拉威','貝南','剛果共和國','奈及利亞'];
var CC_GA = ['Stáit Aontaithe Mheiriceá','Teach na nIonadaithe (SAM)','An Ríocht Aontaithe','Éire','An Fhrainc','An Iodáil','An Ungáir','An tSlóvaic','An Pholainn','An tSeicia','An tSlóivéin','An Ostair','An tSualainn','An Iorua','Ceanada','An Astráil','Iosrael','An tSeapáin','An Mhalaeisia','An Ind','An Phacastáin','An Bhanglaidéis','Neipeal','An Airgintín','Peiriú','Nicearagua','An tSile','Cósta Ríce','An Phoblacht Dhoiminiceach','Uragua','Veiniséala','An Bholaiv','Háití','An Bhrasaíl','Gána','An Mhaláiv','Beinin','Poblacht an Chongó','An Nigéir'];
function ccs(arr) {
  var o = {}; Object.keys(CC_EN).forEach(function (k, i) { o['cc.' + k] = arr[i]; }); return o;
}
function ccEn() { var o = {}; Object.keys(CC_EN).forEach(function (k) { o['cc.' + k] = CC_EN[k]; }); return o; }
function merge(a, b) { for (var k in b) a[k] = b[k]; return a; }

BRB.STR = {
  'en-GB': merge({
    'title.home': 'Be Right Back', 'title.full': 'Full ranking · Be Right Back',
    'nav.home': 'Home', 'nav.full': 'Full ranking', 'theme.light': 'Light', 'theme.dark': 'Dark', 'lang.label': 'Language',
    'hero.title': 'Be Right Back',
    'hero.tagline': 'Every leader leaves. A few are back before the coffee gets cold. Or maybe the coffee has already gone bad?',
    'hero.lede': 'A ranking of how quickly leaders of well-known companies, organisations and governments regained power after losing it. The fewer the days, the higher the rank.',
    'feat.eyebrow': 'Featuring now', 'feat.k1': 'Left office', 'feat.k2': 'Back in office', 'feat.k3': 'Time away', 'feat.k4': 'Rank', 'feat.rankOf': 'of {n}', 'feat.why': 'Why they returned',
    'top.title': 'Top {k}', 'top.sub': 'The fastest comebacks out of {n} on record.', 'top.more': 'Full ranking',
    'rank.title': 'Full ranking', 'rank.sub': 'All {n} comebacks, ordered by days away from power.',
    'tab.all': 'All', 'tab.company': 'Companies', 'tab.gov': 'Governments', 'tab.org': 'Organisations',
    'sort.fast': 'Fastest first', 'sort.recent': 'Most recent', 'sort.name': 'Name',
    'scale.log': 'Log scale', 'scale.lin': 'Linear scale',
    'h.rank': 'Rank', 'h.leader': 'Leader', 'h.out': 'Left', 'h.back': 'Back', 'h.days': 'Days',
    'count': '{n} shown · median {m}', 'unit.day': '{n} day', 'unit.days': '{n} days',
    'method.title': 'Method',
    'm1': 'Days are counted from the formal departure date to the formal return date, in UTC. Ties share a rank.',
    'm2': 'Bars use a logarithmic scale by default, so a five-day comeback and a twelve-year one fit on the same axis.',
    'm3': 'Dates for recent corporate cases were checked against news reports. Older and political dates come from reference works and may differ by a day depending on time zone and source.',
    'foot.updated': 'Updated {date}', 'foot.credit': 'Idea and site by {name}',
    'role.ceo': 'CEO', 'role.interimCeo': 'Interim CEO', 'role.clubPresident': 'Club president', 'role.partyLeader': 'Party leader', 'role.president': 'President', 'role.speaker': 'Speaker', 'role.pm': 'Prime Minister', 'role.taoiseach': 'Taoiseach', 'role.emperor': 'Emperor', 'role.chancellor': 'Chancellor',
    'why.boardReversed': 'Board reversed its decision', 'why.acquisition': 'Returned through a company acquisition', 'why.boardReplaced': 'Board brought him back', 'why.successorOut': 'Successor stepped down', 'why.partyVote': 'Won a party leadership vote', 'why.elect': 'Won the {y} election', 'why.partyWon': 'Party won the {y} election', 'why.exile': 'Returned from exile', 'why.crisis': 'Called back in the {y} crisis', 'why.coalition': 'Formed a new coalition', 'why.collapse': 'Returned after the government fell', 'why.runoff': 'Won the {y} runoff', 'why.restored': 'Restored by international intervention', 'why.civilWar': 'Regained power after civil war'
  }, ccEn()),
  'en-US': {
    'hero.lede': 'A ranking of how quickly leaders of well-known companies, organizations and governments regained power after losing it. The fewer the days, the higher the rank.',
    'tab.org': 'Organizations'
  },
  ga: merge({
    'title.home': 'Fillfidh Mé Gan Mhoill', 'title.full': 'Rangú iomlán · Fillfidh Mé Gan Mhoill',
    'nav.home': 'Baile', 'nav.full': 'Rangú iomlán', 'theme.light': 'Geal', 'theme.dark': 'Dorcha', 'lang.label': 'Teanga',
    'hero.title': 'Fillfidh Mé Gan Mhoill',
    'hero.tagline': 'Fágann gach ceannaire. Filleann cuid acu sula bhfuaraíonn an caife. Nó an bhfuil an caife millte cheana féin?',
    'hero.lede': 'Rangú ar chomh tapa agus a fuair ceannairí cuideachtaí, eagraíochtaí agus rialtas aitheanta a gcumhacht ar ais tar éis dóibh í a chailleadh. Dá lú na laethanta, is airde an rang.',
    'feat.eyebrow': 'Faoin spotsolas anois', 'feat.k1': 'Dáta imeachta', 'feat.k2': 'Dáta fillte', 'feat.k3': 'Am as láthair', 'feat.k4': 'Rang', 'feat.rankOf': 'as {n}', 'feat.why': 'An chúis leis an bhfilleadh',
    'top.title': 'Barr {k}', 'top.sub': 'Na filleadh is tapa as {n} cás sa taifead.', 'top.more': 'Rangú iomlán',
    'rank.title': 'Rangú iomlán', 'rank.sub': 'Gach ceann de na {n} filleadh, in ord laethanta as cumhacht.',
    'tab.all': 'Uile', 'tab.company': 'Cuideachtaí', 'tab.gov': 'Rialtais', 'tab.org': 'Eagraíochtaí',
    'sort.fast': 'Is tapa ar dtús', 'sort.recent': 'Is déanaí', 'sort.name': 'Ainm',
    'scale.log': 'Scála logartamach', 'scale.lin': 'Scála líneach',
    'h.rank': 'Rang', 'h.leader': 'Ceannaire', 'h.out': 'D’fhág', 'h.back': 'D’fhill', 'h.days': 'Laethanta',
    'count': '{n} á léiriú · airmheán {m}', 'unit.day': '{n} lá', 'unit.days': '{n} lá',
    'method.title': 'Modh',
    'm1': 'Áirítear na laethanta ón dáta foirmiúil imeachta go dtí an dáta foirmiúil fillte, in UTC. Roinneann comhionannais an rang céanna.',
    'm2': 'Úsáideann na barraí scála logartamach de réir réamhshocraithe, ionas go n-oirfidh filleadh cúig lá agus filleadh dhá bhliain déag ar an ais chéanna.',
    'm3': 'Seiceáladh dátaí na gcásanna cuideachta le déanaí i gcoinne tuairiscí nuachta. Tagann dátaí níos sine agus dátaí polaitiúla ó shaothair tagartha, agus d’fhéadfadh difríocht lae a bheith iontu de réir crios ama agus foinse.',
    'foot.updated': 'Nuashonraithe {date}', 'foot.credit': 'Smaoineamh agus suíomh le {name}',
    'role.ceo': 'Príomhfheidhmeannach', 'role.interimCeo': 'Príomhfheidhmeannach sealadach', 'role.clubPresident': 'Uachtarán an chlub', 'role.partyLeader': 'Ceannaire páirtí', 'role.president': 'Uachtarán', 'role.speaker': 'Cainteoir', 'role.pm': 'Príomh-Aire', 'role.taoiseach': 'Taoiseach', 'role.emperor': 'Impire', 'role.chancellor': 'Seansailéir',
    'why.boardReversed': 'Chuir an bord a chinneadh ar ceal', 'why.acquisition': 'D’fhill sé tar éis éadáil cuideachta', 'why.boardReplaced': 'Thug an bord ar ais é', 'why.successorOut': 'D’éirigh a chomharba as', 'why.partyVote': 'Bhuaigh sé vóta ceannaireachta an pháirtí', 'why.elect': 'Bhuaigh sé toghchán {y}', 'why.partyWon': 'Bhuaigh a pháirtí toghchán {y}', 'why.exile': 'D’fhill sé ón deoraíocht', 'why.crisis': 'Glaodh air ar ais le linn ghéarchéim {y}', 'why.coalition': 'Chruthaigh sé comhrialtas nua', 'why.collapse': 'D’fhill sé tar éis don rialtas titim', 'why.runoff': 'Bhuaigh sé dara babhta {y}', 'why.restored': 'Athchóiríodh é trí idirghabháil idirnáisiúnta', 'why.civilWar': 'Fuair sé cumhacht ar ais tar éis cogadh cathartha'
  }, ccs(CC_GA)),
  ja: merge({
    'title.home': 'すぐ戻ります', 'title.full': '全ランキング · すぐ戻ります',
    'nav.home': 'ホーム', 'nav.full': '全ランキング', 'theme.light': 'ライト', 'theme.dark': 'ダーク', 'lang.label': '言語',
    'hero.title': 'すぐ戻ります',
    'hero.tagline': 'リーダーは誰もがいつか去る。ごく一部は、コーヒーが冷める前に戻ってくる。それとも、コーヒーはとっくに傷んでいたのだろうか。',
    'hero.lede': '有名企業・組織・政府のリーダーが、権力を失ってからどれだけ早く復帰したかのランキング。日数が少ないほど上位です。',
    'feat.eyebrow': '注目中', 'feat.k1': '退任日', 'feat.k2': '復帰日', 'feat.k3': '不在期間', 'feat.k4': '順位', 'feat.rankOf': '{n}件中', 'feat.why': '復帰の理由',
    'top.title': 'トップ{k}', 'top.sub': '記録された{n}件のうち、最も早い復帰。', 'top.more': '全ランキングを見る',
    'rank.title': '全ランキング', 'rank.sub': '全{n}件を、権力を離れていた日数の順に表示。',
    'tab.all': 'すべて', 'tab.company': '企業', 'tab.gov': '政府', 'tab.org': '組織',
    'sort.fast': '短い順', 'sort.recent': '新しい順', 'sort.name': '名前順',
    'scale.log': '対数目盛', 'scale.lin': '線形目盛',
    'h.rank': '順位', 'h.leader': 'リーダー', 'h.out': '退任', 'h.back': '復帰', 'h.days': '日数',
    'count': '{n}件を表示 · 中央値 {m}', 'unit.day': '{n}日', 'unit.days': '{n}日',
    'method.title': '算出方法',
    'm1': '日数は、正式な退任日から正式な復帰日までをUTCで数えています。日数が同じ場合は同順位です。',
    'm2': 'バーは既定で対数目盛です。5日の復帰と12年の復帰を同じ軸に収められます。',
    'm3': '最近の企業の事例は報道で日付を確認しました。古い事例や政治の事例は資料に基づいており、タイムゾーンや出典により1日前後する場合があります。',
    'foot.updated': '{date} 更新', 'foot.credit': 'アイデアとサイト制作：{name}',
    'role.ceo': 'CEO', 'role.interimCeo': '暫定CEO', 'role.clubPresident': 'クラブ会長', 'role.partyLeader': '党首', 'role.president': '大統領', 'role.speaker': '下院議長', 'role.pm': '首相', 'role.taoiseach': 'アイルランド首相', 'role.emperor': '皇帝', 'role.chancellor': '首相',
    'why.boardReversed': '取締役会が決定を覆した', 'why.acquisition': '企業買収により復帰', 'why.boardReplaced': '取締役会が呼び戻した', 'why.successorOut': '後任が退任', 'why.partyVote': '党首選で勝利', 'why.elect': '{y}年の選挙で勝利', 'why.partyWon': '{y}年の選挙で所属政党が勝利', 'why.exile': '流刑地から帰還', 'why.crisis': '{y}年の危機で呼び戻された', 'why.coalition': '新たな連立を結成', 'why.collapse': '政権崩壊後に復帰', 'why.runoff': '{y}年の決選投票で勝利', 'why.restored': '国際的介入で復位', 'why.civilWar': '内戦を経て権力を回復'
  }, ccs(CC_JA)),
  'zh-Hant': merge({
    'title.home': '馬上回來', 'title.full': '完整排名 · 馬上回來',
    'nav.home': '首頁', 'nav.full': '完整排名', 'theme.light': '淺色', 'theme.dark': '深色', 'lang.label': '語言',
    'hero.title': '馬上回來',
    'hero.tagline': '每位領導人都會離開。有些人在咖啡變涼之前就回來了。又或者，咖啡早已變質？',
    'hero.lede': '各大知名企業、組織與政府的領導人在失去權力後，多快重新掌權的排名。天數越少，名次越前。',
    'feat.eyebrow': '焦點人物', 'feat.k1': '離任日期', 'feat.k2': '復職日期', 'feat.k3': '離開時間', 'feat.k4': '名次', 'feat.rankOf': '共 {n} 筆', 'feat.why': '回歸原因',
    'top.title': '前 {k} 名', 'top.sub': '在 {n} 筆紀錄中，最快的回歸。', 'top.more': '查看完整排名',
    'rank.title': '完整排名', 'rank.sub': '全部 {n} 筆回歸，依離開權力的天數排序。',
    'tab.all': '全部', 'tab.company': '企業', 'tab.gov': '政府', 'tab.org': '組織',
    'sort.fast': '最快優先', 'sort.recent': '最新', 'sort.name': '姓名',
    'scale.log': '對數刻度', 'scale.lin': '線性刻度',
    'h.rank': '名次', 'h.leader': '領導人', 'h.out': '離任', 'h.back': '復職', 'h.days': '天數',
    'count': '顯示 {n} 筆 · 中位數 {m}', 'unit.day': '{n} 天', 'unit.days': '{n} 天',
    'method.title': '計算方式',
    'm1': '天數以正式離任日至正式復職日計算，採用 UTC。天數相同者名次並列。',
    'm2': '長條預設使用對數刻度，因此五天的回歸與十二年的回歸可以放在同一條軸上。',
    'm3': '近期企業案例的日期已對照新聞報導查證。較早期與政治類案例的日期取自參考資料，可能因時區與來源不同而相差一天。',
    'foot.updated': '更新於 {date}', 'foot.credit': '創意與網站：{name}',
    'role.ceo': '執行長', 'role.interimCeo': '代理執行長', 'role.clubPresident': '俱樂部主席', 'role.partyLeader': '黨魁', 'role.president': '總統', 'role.speaker': '議長', 'role.pm': '首相', 'role.taoiseach': '愛爾蘭總理', 'role.emperor': '皇帝', 'role.chancellor': '總理',
    'why.boardReversed': '董事會撤回決定', 'why.acquisition': '因公司收購而回歸', 'why.boardReplaced': '董事會請其回任', 'why.successorOut': '繼任者下台', 'why.partyVote': '贏得黨魁選舉', 'why.elect': '贏得 {y} 年選舉', 'why.partyWon': '所屬政黨贏得 {y} 年選舉', 'why.exile': '自流亡中歸來', 'why.crisis': '{y} 年危機中被召回', 'why.coalition': '組成新聯合政府', 'why.collapse': '政府垮台後復出', 'why.runoff': '贏得 {y} 年決選', 'why.restored': '在國際干預下復位', 'why.civilWar': '內戰後重掌權力'
  }, ccs(CC_ZH)),
  /* Kashur, romanised source. Verb first, effect before cause, final mood particles ash / pe / no. */
  qaa: {
    'title.home': 'ti-ma sa-na', 'title.full': 'ra-ri ku-ha · ti-ma sa-na',
    'nav.home': 'ha-si', 'nav.full': 'ra-ri ku-ha', 'theme.light': 'ru-ku', 'theme.dark': 'na-hi', 'lang.label': 'ma-su',
    'hero.title': 'ti-ma sa-na',
    'hero.tagline': 'nu-ri ka-su-ka-su ash. ti-ma mi-ta ka-su ha-ma ki-tu sa-su ash. ru-ma nu-ka ki-tu ti-ri no pe',
    'hero.lede': 'ra-ri ka-su ti-ma sa-na ash. hi-ta mi-ta ra-ri sa-na ash.',
    'feat.eyebrow': 'ra-ru ni-ta', 'feat.k1': 'nu-ri', 'feat.k2': 'ti-ma', 'feat.k3': 'hi-ta', 'feat.k4': 'ra-ri', 'feat.rankOf': '/ {n}', 'feat.why': 'tu-ni',
    'top.title': 'sa-na {k}', 'top.sub': 'ra-ru ti-ma sa-na ash. ku-ha {n}.', 'top.more': 'ra-ri ku-ha',
    'rank.title': 'ra-ri ku-ha', 'rank.sub': 'ra-ru ku-ha {n} ti-ma, sa-na ha-ma nu-ni ash',
    'tab.all': 'ku-ha', 'tab.company': 'ma-ni', 'tab.gov': 'ta-ru-nu', 'tab.org': 'ha-na-ru',
    'sort.fast': 'sa-na', 'sort.recent': 'ni-ta', 'sort.name': 'na-ma',
    'scale.log': 'ra-hu', 'scale.lin': 'ri-ni',
    'h.rank': 'ra-ri', 'h.leader': 'ka-su', 'h.out': 'nu-ri', 'h.back': 'ti-ma', 'h.days': 'hi-ta',
    'count': '{n} ti-ma · tu-ha-sa {m}', 'unit.day': '{n} hi-ta', 'unit.days': '{n} hi-ta',
    'method.title': 'ni-ru-ka',
    'm1': 'hi-ta ku-ru nu-ri ha-ma ti-ma ash. ra-ri ha-ni ti-ru ash.',
    'm2': 'ra-hu ha-ri-ka ash. hi-ta ni-ni ha-ma hi-ta ra-ra-ra ash.',
    'm3': 'tu-ni ma-ni sa-na ku-ru ru-ma ni-ka ash. hi-ta ta-ru-nu ni-ti ha-hu-ni-ta, ka-ta ni-ni ash.',
    'foot.updated': 'ni-ta {date}', 'foot.credit': 'tu-ni ha-ra {name}',
    'role.ceo': 'ka-su-ma-ni', 'role.interimCeo': 'ka-su-ma-ni-ti-ti', 'role.clubPresident': 'ka-su-ni-ha', 'role.partyLeader': 'ka-su-su-na', 'role.president': 'ka-su-ta-ru', 'role.speaker': 'ni-hu-ka-su', 'role.pm': 'ka-su-ru-hi', 'role.taoiseach': 'ka-su-ma-hu', 'role.emperor': 'ka-su-ka-su-hu', 'role.chancellor': 'ka-su-hu-ri',
    'why.boardReversed': 'ti-ma ka-su, su-ta-ru ma-ni-ka ash', 'why.acquisition': 'ti-ma ka-su, ha-nu ma-ni ash', 'why.boardReplaced': 'ti-ma ka-su, ru-na ma-ni-ka ash', 'why.successorOut': 'ti-ma ka-su, nu-ri ka-su-hi-ta ash', 'why.partyVote': 'ti-ma ka-su, ha-ti su-na ash', 'why.elect': 'ti-ma ka-su, ha-ti ta-ru {y} ash', 'why.partyWon': 'ti-ma ka-su, ha-ti su-na {y} ash', 'why.exile': 'ti-ma ka-su, ni-ra-ha ash', 'why.crisis': 'ti-ma ka-su, si-ra-ma {y} ash', 'why.coalition': 'ti-ma ka-su, ku-ha su-na ash', 'why.collapse': 'ti-ma ka-su, su-ku-ru ta-ru ash', 'why.runoff': 'ti-ma ka-su, ha-ti ra-ha {y} ash', 'why.restored': 'ti-ma ka-su, ni-ta-ra ru-ha ash', 'why.civilWar': 'ti-ma ka-su, ku-ru-ka ta-ru-ma ash'
  }
};
BRB.LANGS[5].label = BRB.cune('ka-su-ra') + ' · Kashur';
