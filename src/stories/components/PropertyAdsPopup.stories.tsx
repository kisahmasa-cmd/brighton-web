import PropertyAdsPopup from "@/components/custom/PropertyAdsPopup";
import { Button } from "@/components/ui/button";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useRef } from "react";
import { Property } from "../../../types/property-types";

export default {
  title: "Components/PropertyAdsPopup",
  component: PropertyAdsPopup,
  tags: ["autodocs"],
} as Meta<typeof PropertyAdsPopup>;

const Template: StoryFn<typeof PropertyAdsPopup> = (args) => {
  const popupRef = useRef<{ openDialog: () => void }>(null);

  const data: Property = {
    ID: 2446,
    ClassName: "PrimaryPropertyData",
    Created: "2025-10-22 10:30:59",
    LastEdited: "2025-10-24 11:16:36",
    Title: "MAGGIORE FRESH MARKET",
    Title2: "Ruko",
    Label: null,
    Content:
      '<p data-start="25" data-end="428"><strong data-start="25" data-end="50">Maggiore Fresh Market</strong> merupakan area komersial terbaru persembahan <strong data-start="96" data-end="114">Paramount Land</strong> yang dirancang sebagai pusat kuliner, belanja, dan gaya hidup modern di kawasan <strong data-start="195" data-end="213">Gading Serpong</strong>. Mengusung konsep pasar modern yang elegan dan nyaman, Maggiore Fresh Market menjadi destinasi bagi para pengusaha dan investor yang ingin berpartisipasi dalam dinamika ekonomi kota mandiri yang terus berkembang.</p><h2 data-start="430" data-end="463">Lokasi &amp; Konektivitas Unggul</h2><ul data-start="464" data-end="870">\n<li data-start="464" data-end="570">\n<p data-start="466" data-end="570">Terletak strategis di <strong data-start="488" data-end="506">Gading Serpong</strong>, kawasan premium dengan akses mudah ke berbagai area penting.</p>\n</li>\n<li data-start="571" data-end="685">\n<p data-start="573" data-end="685">Dekat dengan <strong data-start="586" data-end="682">Summarecon Mall Serpong, Universitas Multimedia Nusantara (UMN), dan kawasan bisnis BSD City</strong>.</p>\n</li>\n<li data-start="686" data-end="760">\n<p data-start="688" data-end="760">Akses cepat ke <strong data-start="703" data-end="728">Tol Jakarta–Tangerang</strong> dan <strong data-start="733" data-end="757">Tol Serpong–Balaraja</strong>.</p>\n</li>\n<li data-start="761" data-end="870">\n<p data-start="763" data-end="870">Dikelilingi oleh area residensial padat dan pusat aktivitas masyarakat dengan traffic tinggi setiap hari.</p>\n</li>\n</ul><h2 data-start="872" data-end="903">Konsep &amp; Fasilitas Kawasan</h2><ul data-start="904" data-end="1371">\n<li data-start="904" data-end="992">\n<p data-start="906" data-end="992">Mengusung konsep <strong data-start="923" data-end="946">Fresh Market Modern</strong> dengan tata ruang rapi, bersih, dan nyaman.</p>\n</li>\n<li data-start="993" data-end="1096">\n<p data-start="995" data-end="1096">Dirancang sebagai pusat kegiatan masyarakat yang memadukan <strong data-start="1054" data-end="1093">pasar, restoran, dan area lifestyle</strong>.</p>\n</li>\n<li data-start="1097" data-end="1371">\n<p data-start="1099" data-end="1152">Fasilitas lengkap untuk mendukung aktivitas bisnis:</p>\n<ul data-start="1155" data-end="1371">\n<li data-start="1155" data-end="1184">\n<p data-start="1157" data-end="1184">Area parkir luas dan aman</p>\n</li>\n<li data-start="1187" data-end="1222">\n<p data-start="1189" data-end="1222">Sistem keamanan 24 jam dan CCTV</p>\n</li>\n<li data-start="1225" data-end="1295">\n<p data-start="1227" data-end="1295">Penataan lingkungan dengan taman dan jalur pedestrian yang estetik</p>\n</li>\n<li data-start="1298" data-end="1371">\n<p data-start="1300" data-end="1371">Unit toko dengan desain modern dan ukuran fleksibel (mulai 4.5 x 7 m)</p>\n</li>\n</ul>\n</li>\n</ul><h2 data-start="1373" data-end="1405">Nilai Tambah &amp; Diferensiasi</h2><ul data-start="1406" data-end="1827">\n<li data-start="1406" data-end="1512">\n<p data-start="1408" data-end="1512">Dikembangkan oleh <strong data-start="1426" data-end="1444">Paramount Land</strong>, pengembang ternama di Gading Serpong dengan reputasi terpercaya.</p>\n</li>\n<li data-start="1513" data-end="1592">\n<p data-start="1515" data-end="1592">Konsep berbeda dari pasar tradisional — lebih higienis, modern, dan nyaman.</p>\n</li>\n<li data-start="1593" data-end="1660">\n<p data-start="1595" data-end="1660">Menyasar segmen pasar menengah ke atas dengan daya beli tinggi.</p>\n</li>\n<li data-start="1661" data-end="1751">\n<p data-start="1663" data-end="1751">Terintegrasi dengan area residensial dan komersial di kawasan Maggiore dan sekitarnya.</p>\n</li>\n<li data-start="1752" data-end="1827">\n<p data-start="1754" data-end="1827">Memiliki potensi traffic tinggi dari warga Gading Serpong dan BSD City.</p>\n</li>\n</ul><h2 data-start="1829" data-end="1854">Kenapa Harus Memilih</h2><ul data-start="1855" data-end="2238">\n<li data-start="1855" data-end="1946">\n<p data-start="1857" data-end="1946">Lokasi strategis dan dikelilingi komunitas aktif yang menjadi captive market potensial.</p>\n</li>\n<li data-start="1947" data-end="2060">\n<p data-start="1949" data-end="2060">Desain bangunan menarik dan fungsional untuk berbagai jenis usaha — mulai dari F&amp;B, retail, hingga lifestyle.</p>\n</li>\n<li data-start="2061" data-end="2143">\n<p data-start="2063" data-end="2143">Investasi properti komersial dengan <strong data-start="2099" data-end="2140">ROI tinggi dan prospek jangka panjang</strong>.</p>\n</li>\n<li data-start="2144" data-end="2238">\n<p data-start="2146" data-end="2238">Aksesibilitas mudah, lingkungan tertata, dan dukungan infrastruktur yang berkembang pesat.</p>\n</li>\n</ul><h2 data-start="2240" data-end="2269">Lokasi dan Potensi Pasar</h2><ul data-start="2270" data-end="2707">\n<li data-start="2270" data-end="2385">\n<p data-start="2272" data-end="2385">Gading Serpong merupakan kawasan kota mandiri dengan lebih dari <strong data-start="2336" data-end="2362">150.000 penghuni aktif</strong> dan terus bertambah.</p>\n</li>\n<li data-start="2386" data-end="2511">\n<p data-start="2388" data-end="2511">Potensi pasar tinggi karena tingginya mobilitas dan kebutuhan masyarakat urban terhadap pusat kuliner dan belanja modern.</p>\n</li>\n<li data-start="2512" data-end="2595">\n<p data-start="2514" data-end="2595">Dikelilingi oleh perkantoran, sekolah, universitas, dan kawasan perumahan elit.</p>\n</li>\n<li data-start="2596" data-end="2707">\n<p data-start="2598" data-end="2707">Sangat ideal untuk investor dan pelaku usaha yang mencari peluang bisnis dengan traffic stabil setiap hari.</p>\n</li>\n</ul><h2 data-start="2709" data-end="2738">Fasilitas dan Lingkungan</h2><ul data-start="2739" data-end="3040">\n<li data-start="2739" data-end="2810">\n<p data-start="2741" data-end="2810">Dilengkapi dengan area pedestrian luas dan pencahayaan yang modern.</p>\n</li>\n<li data-start="2811" data-end="2867">\n<p data-start="2813" data-end="2867">Lingkungan bersih, aman, dan nyaman bagi pengunjung.</p>\n</li>\n<li data-start="2868" data-end="2945">\n<p data-start="2870" data-end="2945">Didukung sistem manajemen profesional untuk menjaga kualitas area bisnis.</p>\n</li>\n<li data-start="2946" data-end="3040">\n<p data-start="2948" data-end="3040">Suasana kawasan yang hidup, modern, dan berdaya tarik tinggi untuk konsumen maupun tenant.</p>\n</li>\n</ul><p data-start="3042" data-end="3345" data-is-last-node="" data-is-only-node=""><strong data-start="3042" data-end="3067">Maggiore Fresh Market</strong> bukan sekadar tempat berjualan, tetapi pusat gaya hidup baru yang menghidupkan aktivitas komunitas modern di Gading Serpong. Bergabunglah dalam peluang bisnis menjanjikan ini dan jadilah bagian dari ekosistem komersial yang tumbuh pesat di jantung kawasan prestisius Tangerang.</p>',
    Keunggulan: null,
    PriceMin: "745000000",
    PriceMax: "3800000000",
    LB: null,
    Type: "Ruko",
    Latitude: -6.272567899227476,
    Longitude: 106.63955305889549,
    BentukKerjasama: "OPEN AGENT",
    PriceFormat: "745,000,000 ~ 3,800,000,000",
    ShortContent:
      "*Maggiore Fresh Market* merupakan area komersial terbaru persembahan *Paramount Land* yang dirancang sebagai pusat kuliner, belanja, dan gaya hidup modern di kawasan *Gading Serpong*. Mengusung konsep...",
    URLSegment: "maggiore-fresh-market",
    Link: "https://www.brighton.co.id/perumahan-baru/viewdetail/maggiore-fresh-market",
    Logo: null,
    Photo: {
      ID: 19130861,
      Title: "imgi 16 pm maggiore produksi view 00081",
      Small:
        "https://cdn.brighton.co.id/Uploads/Images/19130861/9x08JhNV/imgi-16-pm-maggiore-produksi-view-00081-Small.jpg",
      Medium:
        "https://cdn.brighton.co.id/Uploads/Images/19130861/9x08JhNV/imgi-16-pm-maggiore-produksi-view-00081-Medium.jpg",
      Original:
        "https://cdn.brighton.co.id/Uploads/Images/19130861/9x08JhNV/imgi-16-pm-maggiore-produksi-view-00081.jpg",
    },
    Photos: [
      {
        ID: 19130861,
        Title: "imgi 16 pm maggiore produksi view 00081",
        Small:
          "https://cdn.brighton.co.id/Uploads/Images/19130861/9x08JhNV/imgi-16-pm-maggiore-produksi-view-00081-Small.jpg",
        Medium:
          "https://cdn.brighton.co.id/Uploads/Images/19130861/9x08JhNV/imgi-16-pm-maggiore-produksi-view-00081-Medium.jpg",
        Original:
          "https://cdn.brighton.co.id/Uploads/Images/19130861/9x08JhNV/imgi-16-pm-maggiore-produksi-view-00081.jpg",
      },
    ],
    IsOpenHouse: "0",
    Agent: [
      {
        ID: 20990,
        ClassName: "AgentData",
        Name: "DEWITHA (SUOF)",
        WAPhone: "6281517183150",
        WAPhone2: null,
        Phone: "081517183150",
        PhoneCDMA: null,
        Address:
          " AZURA HOUSE BLOK C15 NO.25, VANYA PARK, BSD                 ",
        Position: "Business Manager",
        Link: "https://www.brighton.co.id/anitadewisoesanto",
        Online: false,
        LastOnline: "2025-05-21 13:43:00",
        ShowLocation: true,
        Photo: {
          ID: 7043282,
          Title: "Foto Bu Dewitha",
          Small:
            "https://cdn.brighton.co.id/Uploads/Images/7043282/kkcnsdLk/Foto-Bu-Dewitha-Small.jpg",
          Medium:
            "https://cdn.brighton.co.id/Uploads/Images/7043282/kkcnsdLk/Foto-Bu-Dewitha-Medium.jpg",
          Original:
            "https://cdn.brighton.co.id/Uploads/Images/7043282/kkcnsdLk/Foto-Bu-Dewitha.jpg",
        },
        Office: {
          ID: 38,
          ClassName: "OfficeData",
          Phone: "021 2222 9991",
          Name: "Brighton Favour BSD",
          Address:
            "Ruko Mendrisio 3 Blok C No.30 Boulevard Il Lago, Gading Serpong",
          Email: "brightonfavour@yahoo.com",
          City: "BSD",
          Code: "BRBSD",
          Alias: "Brighton Favour",
          LocationAndProvince: "BSD - Tangerang",
        },
      },
      {
        ID: 17679,
        ClassName: "AgentData",
        Name: "LOLITA (PUTL)",
        WAPhone: "6285921514729",
        WAPhone2: null,
        Phone: "085921514729",
        PhoneCDMA: null,
        Address: "JL CHALCEDONY BARAT 7 NO 11, TANGERANG",
        Position: "Business Manager",
        Link: "https://www.brighton.co.id/lolitaodinloekito",
        Online: false,
        LastOnline: "2025-05-21 14:46:25",
        ShowLocation: true,
        Photo: {
          ID: 4037948,
          Title: "LOLITA",
          Small:
            "https://cdn-files.brighton.co.id/Uploads/Images/4037948/9Q8GXI8S/LOLITA-Small.jpg",
          Medium:
            "https://cdn-files.brighton.co.id/Uploads/Images/4037948/9Q8GXI8S/LOLITA-Medium.jpg",
          Original:
            "https://cdn-files.brighton.co.id/Uploads/Images/4037948/9Q8GXI8S/LOLITA.jpg",
        },
        Office: {
          ID: 450,
          ClassName: "OfficeData",
          Phone: "021 38924226",
          Name: "Brighton Priority Gading Serpong",
          Address:
            "Ruko Crystal Blok CRL 2 No. 22, Kel. Pakulonan Barat, Kec. Kelapa Dua",
          Email: "brightonhub.gadingserpong@yahoo.com",
          City: "Gading Serpong",
          Code: "PRGS",
          Alias: "Brighton Priority",
          LocationAndProvince: "Gading Serpong - Tangerang",
        },
      },
    ],
    Location: {
      ID: 25,
      Title: "Tangerang",
      RumahComCode: "IDBT06",
      RumahComParentCode: "IDBT",
      Rumah123District: "A Yani",
      Rumah123City: "Tangerang",
      Rumah123Province: "Banten",
      ProvinceID: "5",
      URLSegment: "tangerang",
      Province: {
        ClassName: "ProvinceData",
        LastEdited: "2019-02-18 11:06:24",
        Created: "2016-09-04 01:09:29",
        Title: "Banten",
        URLSegment: "banten",
        RumahComCode: "IDBT",
        Rumah123ID: "7",
        DoverID: "18",
        UrbanindoTitle: "Banten",
        LamudiTitle: "Banten",
        Overseas: "0",
        CountryID: "1",
        ID: 5,
        RecordClassName: "ProvinceData",
      },
      Photo: {
        ID: 7925363,
        Title: "Tangerang 2024",
        Small:
          "https://cdn.brighton.co.id/Uploads/Images/7925363/hRvEtNhi/Tangerang-2024-Small.jpeg",
        Medium:
          "https://cdn.brighton.co.id/Uploads/Images/7925363/hRvEtNhi/Tangerang-2024-Medium.jpeg",
        Original:
          "https://cdn.brighton.co.id/Uploads/Images/7925363/hRvEtNhi/Tangerang-2024.jpeg",
        SmallWebP:
          "https://cdn.brighton.co.id/Uploads/Images/7925363/hRvEtNhi/Tangerang-2024-Small.webp",
        MediumWebP:
          "https://cdn.brighton.co.id/Uploads/Images/7925363/hRvEtNhi/Tangerang-2024-Medium.webp",
        OriginalWebP:
          "https://cdn.brighton.co.id/Uploads/Images/7925363/hRvEtNhi/Tangerang-2024.webp",
      },
    },
    IsBookmark: false,
  };

  return (
    <div className="space-y-4">
      <PropertyAdsPopup
        variant={args.variant}
        data={data}
        onReady={(actions) => {
          popupRef.current = actions;
        }}
      />
      <Button
        variant="secondary"
        onClick={() => popupRef.current?.openDialog()}
      >
        Open {args.variant}
      </Button>
    </div>
  );
};

export const V1 = Template.bind({});
V1.args = {
  variant: "v1",
};

export const V2 = Template.bind({});
V2.args = {
  variant: "v2",
};

export const V3 = Template.bind({});
V3.args = {
  variant: "v3",
};
