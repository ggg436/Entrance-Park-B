import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BlogPost = () => {
  const { id } = useParams();

  // Sample blog posts data (in a real app, this would come from an API)
  const blogPosts = [
    {
      id: "1",
      title: "Sustainable Rice Farming Practices in Terai Region of Nepal",
      author: "Binod Sharma",
      date: "15 May 2024",
      description: "Innovative approaches to sustainable rice cultivation in Nepal's fertile Terai region, focusing on water conservation and organic methods...",
      image: "https://images.unsplash.com/photo-1595339589628-3d8a8e1644ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Rice cultivation is the backbone of Nepal's agriculture, particularly in the fertile plains of the Terai region. However, traditional farming methods often face challenges related to water scarcity, soil degradation, and chemical dependency. This article explores innovative sustainable practices being adopted by forward-thinking farmers across the region.</p>
        
        <h2>System of Rice Intensification (SRI)</h2>
        <p>The System of Rice Intensification (SRI) is gaining popularity among Terai farmers, with remarkable results. This approach involves transplanting younger seedlings with wider spacing, intermittent irrigation instead of continuous flooding, and organic soil amendments. Farmers implementing SRI report yield increases of 20-50% while using 30-50% less water and fewer inputs.</p>
        
        <h2>Integrated Pest Management</h2>
        <p>Chemical pesticides are being replaced with integrated pest management (IPM) techniques. Local farmers are now using pheromone traps, beneficial insects, and resistant rice varieties to manage pests. This not only reduces production costs but also preserves the rich biodiversity of the Terai ecosystem.</p>
        
        <h2>Community Seed Banking</h2>
        <p>Traditional rice varieties adapted to local conditions are being preserved through community seed banking initiatives. These indigenous varieties often show better resilience to local pests and climate variations than commercial hybrids. The Tharu community in particular has been instrumental in preserving over 60 traditional rice varieties.</p>
        
        <h2>Future Outlook</h2>
        <p>With government support and increasing farmer awareness, sustainable rice farming practices are spreading across the Terai. These methods promise not only environmental benefits but also economic advantages for smallholder farmers who can reduce input costs while maintaining or increasing yields. The transition to sustainable rice farming represents a promising path forward for Nepal's agricultural future.</p>
      `
    },
    {
      id: "2",
      title: "Nepal's Coffee Revolution: Small Farmers Reaching Global Markets",
      author: "Anisha Gurung",
      date: "10 May 2024",
      description: "How Nepali hill farmers are transforming their livelihoods through specialty coffee production and international market access...",
      image: "https://images.unsplash.com/photo-1599930113854-d6d7fd522204?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Nestled in the mid-hills of Nepal, a quiet revolution is brewing. Small-scale farmers who once struggled to make ends meet are now producing specialty coffee that commands premium prices in international markets. This transformation is changing rural economies and putting Nepal on the global coffee map.</p>
        
        <h2>Perfect Growing Conditions</h2>
        <p>Nepal's mid-hills, situated between 800-2000 meters above sea level, offer ideal conditions for growing arabica coffee. The high altitude, natural shade from forest cover, and organic farming methods result in beans with complex flavor profiles that are increasingly sought after by specialty roasters worldwide.</p>
        
        <h2>Cooperatives Leading the Way</h2>
        <p>Farmer cooperatives have been crucial in this coffee revolution. Groups like the Gulmi District Coffee Cooperative Federation have helped small farmers access training, processing facilities, and direct market connections. By working together, farmers can meet quality standards and export volumes required by international buyers.</p>
        
        <h2>Challenges and Opportunities</h2>
        <p>While Nepali coffee represents only a tiny fraction of global production, its reputation for quality is growing. However, farmers still face challenges including limited infrastructure, climate change impacts, and competition from established coffee-producing nations. Despite these obstacles, Nepal's annual coffee exports have been growing steadily, with specialty coffees now reaching markets in Japan, Korea, Europe, and the United States.</p>
        
        <h2>Beyond Economics</h2>
        <p>The benefits extend beyond economic returns. Coffee cultivation has helped reduce soil erosion on hillsides, provided an alternative to youth migration, and created opportunities for women who often take leading roles in harvesting and processing. As one farmer from Kaski district noted, "Coffee hasn't just brought us income, it's brought our children back to the village."</p>
      `
    },
    {
      id: "3",
      title: "Climate-Resilient Agriculture: Adapting to Changing Weather Patterns in Nepal",
      author: "Rajan Thapa",
      date: "5 May 2024",
      description: "Strategies being implemented by Nepali farmers to adapt to increasingly unpredictable monsoons and changing climate conditions...",
      image: "https://images.unsplash.com/photo-1585132004237-dd248ba70067?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Nepal's farmers have always lived by the rhythm of the monsoons. However, climate change is disrupting these traditional patterns with increasingly unpredictable rainfall, extended dry periods, and extreme weather events. Across the country, innovative farmers are developing and adopting climate-resilient agricultural practices.</p>
        
        <h2>Water Management Innovations</h2>
        <p>In response to erratic rainfall, communities are reviving and improving traditional water harvesting systems. In the hills of Kaski and Syangja districts, farmers are constructing small ponds to collect rainwater for dry season irrigation. Meanwhile, in the eastern Terai, solar-powered micro-irrigation systems are helping farmers make efficient use of limited groundwater resources.</p>
        
        <h2>Crop Diversification and Rotation</h2>
        <p>Mono-cropping is giving way to diversified farming systems that spread risk and improve soil health. Farmers are incorporating drought-resistant crops like millets and certain bean varieties alongside traditional staples. Agroforestry approaches that integrate trees with crops are also gaining popularity, particularly in hilly areas prone to erosion.</p>
        
        <h2>Climate-Smart Technologies</h2>
        <p>Access to timely weather information is crucial for climate adaptation. Mobile phone applications now provide localized weather forecasts to help farmers plan planting and harvesting. In partnership with the Department of Hydrology and Meteorology, local agricultural extension services are establishing automated weather stations in key agricultural zones to improve forecast accuracy.</p>
        
        <h2>Community-Based Approaches</h2>
        <p>Perhaps most importantly, adaptation efforts are increasingly community-led rather than top-down. Farmer field schools and community seed banks enable knowledge sharing and preservation of locally adapted crop varieties. As climate challenges intensify, these networks of innovation and mutual support may prove to be Nepal's most valuable agricultural resource.</p>
      `
    },
    {
      id: "4",
      title: "Traditional Seed Preservation Efforts in Remote Mountain Communities",
      author: "Kamala Bhattarai",
      date: "28 Apr 2024",
      description: "How indigenous communities in Nepal's mountains are working to preserve ancient crop varieties and agricultural biodiversity...",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>In the remote mountain valleys of Nepal, far from the reach of commercial agriculture, indigenous communities are guardians of an invaluable agricultural heritage: hundreds of locally adapted crop varieties developed over generations. These traditional seeds represent not just biodiversity but cultural identity and food sovereignty.</p>
        
        <h2>Living Seed Banks</h2>
        <p>While modern agriculture has narrowed to rely on a handful of crop varieties, Nepal's mountain communities still cultivate an astonishing diversity. The Jumla region alone maintains over 20 varieties of beans, each adapted to specific microenvironments. In Dolpa, farmers grow ancient wheat landraces that can thrive at altitudes above 3,500 meters where modern varieties fail.</p>
        
        <h2>Community Conservation Initiatives</h2>
        <p>Recognizing the value of this agricultural biodiversity, communities have established local seed banks and exchange networks. In Humla district, the "Seeds for Future" initiative documents traditional knowledge while maintaining living collections of local crop varieties. Women often play central roles in these conservation efforts, as they have traditionally been the keepers of seeds and agricultural knowledge.</p>
        
        <h2>Climate Resilience Through Diversity</h2>
        <p>This genetic diversity has new significance in the face of climate change. Traditional varieties often possess traits like drought tolerance, pest resistance, or ability to mature in shorter growing seasons. Scientists and farmers are now working together to identify climate-resilient traits in these traditional varieties that could be valuable for broader agricultural adaptation.</p>
        
        <h2>Challenges to Preservation</h2>
        <p>Despite their value, traditional seed systems face threats from outmigration, changing dietary preferences, and agricultural modernization. Supportive policies that recognize farmers' rights to save and exchange seeds are crucial, as are markets that value the unique qualities of traditional varieties. As one farmer from Mustang district explained, "These seeds are our ancestors' gift. If we lose them, we cannot get them back."</p>
      `
    },
    {
      id: "5",
      title: "Millet Renaissance: Reviving Nepal's Forgotten Super Grain",
      author: "Deepak Adhikari",
      date: "22 Apr 2024",
      description: "The growing movement to revive millet cultivation in Nepal's mid-hills, highlighting its nutritional benefits and climate resilience...",
      image: "https://images.unsplash.com/photo-1586201375813-78ca47ae29b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Once a staple food across Nepal's mid-hills, finger millet (kodo) and other traditional millets were gradually replaced by rice and wheat in recent decades. Now, these ancient grains are experiencing a revival, driven by growing recognition of their nutritional value, climate resilience, and cultural significance.</p>
        
        <h2>Nutritional Powerhouse</h2>
        <p>Millets are nutritional powerhouses, containing higher levels of protein, fiber, and micronutrients than many common grains. Finger millet contains 30 times more calcium than rice and is rich in iron and essential amino acids. These nutritional properties are particularly important in rural areas where dietary diversity may be limited and micronutrient deficiencies common.</p>
        
        <h2>Climate-Smart Agriculture</h2>
        <p>As Nepal faces increasingly unpredictable rainfall patterns due to climate change, millet's natural drought tolerance makes it a strategic crop choice. Farmers in districts like Kavre and Ramechhap report that millet crops survive dry spells that would devastate rice paddies. Additionally, millets require minimal external inputs, making them ideal for resource-constrained smallholder farmers.</p>
        
        <h2>Market Development and Value Addition</h2>
        <p>New markets are emerging for millet-based products. In urban centers, health-conscious consumers are seeking out traditional foods with proven nutritional benefits. Innovative entrepreneurs are developing products like millet cookies, bread, and breakfast cereals. Some farmers' cooperatives have established small processing units to produce millet flour and ready-to-cook products that command premium prices.</p>
        
        <h2>Policy Support</h2>
        <p>The government's recent inclusion of millets in the national food security strategy represents an important policy shift. Support programs now provide improved millet seeds and promote conservation of local varieties. The designation of certain districts as "millet promotion zones" has channeled resources toward research and extension services for these traditional crops.</p>
        
        <h2>Cultural Reclamation</h2>
        <p>Beyond nutrition and agriculture, the millet revival represents a reclaiming of cultural heritage. Traditional preparation methods and recipes are being documented and celebrated. In Lamjung district, the annual "Millet Festival" brings together farmers, chefs, and the public to showcase the diversity and culinary potential of these ancient grains.</p>
      `
    },
    {
      id: "6",
      title: "Agricultural Cooperatives Transforming Rural Nepal's Economy",
      author: "Sarita Poudel",
      date: "17 Apr 2024",
      description: "How farmer-led cooperatives are improving market access, providing technical support, and increasing incomes across Nepal...",
      image: "https://images.unsplash.com/photo-1593260654784-4aa47cd0c803?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Across rural Nepal, agricultural cooperatives are emerging as powerful engines of economic transformation. By pooling resources, knowledge, and market power, these farmer-led organizations are addressing longstanding challenges that have limited agricultural productivity and profitability.</p>
        
        <h2>Collective Market Power</h2>
        <p>Individual smallholder farmers often lack bargaining power when selling their produce. Through cooperatives, farmers can aggregate their products, establish collection centers, and negotiate better prices with buyers. The Trisuli Valley Vegetable Cooperative in Nuwakot district, for example, now supplies fresh produce directly to supermarkets in Kathmandu, eliminating multiple intermediaries and increasing farmers' share of the final price by over 30%.</p>
        
        <h2>Input Supply and Finance</h2>
        <p>Cooperatives are also transforming input markets by bulk-purchasing seeds, tools, and organic fertilizers. This reduces costs for individual farmers and improves access to quality inputs. Many cooperatives have established revolving loan funds that provide members with affordable credit for agricultural investments – a critical service in areas where formal financial institutions are absent or unwilling to lend to small farmers.</p>
        
        <h2>Technical Knowledge and Innovation</h2>
        <p>Agricultural cooperatives serve as important knowledge hubs. By partnering with agricultural extension services and research institutions, they help disseminate improved farming techniques and appropriate technologies. In Sindhupalchok district, the Himalayan Organic Cooperative arranges regular farmer-to-farmer training sessions where members share successful practices in organic production methods.</p>
        
        <h2>Value Addition and Processing</h2>
        <p>Moving beyond raw commodity production, many cooperatives are investing in processing facilities. The Palpa Citrus Cooperative now produces branded juice products from members' oranges, significantly increasing the value of their harvest. Similarly, dairy cooperatives across Nepal have established chilling centers and processing facilities that enable farmers in remote areas to participate in the formal dairy market.</p>
        
        <h2>Inclusion and Equity</h2>
        <p>Well-managed cooperatives are creating opportunities for marginalized groups. Many have established quotas for women and members of disadvantaged communities in leadership positions. The Mahila Utthan (Women's Upliftment) Cooperative in Dhading district, run entirely by women farmers, has helped members establish kitchen gardens and small-scale commercial vegetable production, significantly improving household nutrition and income.</p>
      `
    },
    {
      id: "7",
      title: "Digital Revolution in Nepali Agriculture: Mobile Apps for Farmers",
      author: "Rajesh KC",
      date: "12 Apr 2024",
      description: "New mobile technologies helping Nepali farmers access weather forecasts, market prices, and agricultural advice in remote areas...",
      image: "https://images.unsplash.com/photo-1570358934836-6802981e481e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>As smartphone penetration reaches even remote villages across Nepal, a new generation of mobile applications is transforming how farmers access information, make decisions, and connect to markets. These digital tools are helping bridge the longstanding information gap in rural areas.</p>
        
        <h2>Weather and Climate Services</h2>
        <p>Unpredictable weather patterns have always challenged Nepali farmers, but mobile apps now provide localized weather forecasts and seasonal outlooks. The "MeroKisan" app delivers 7-day weather forecasts tailored to specific districts, helping farmers time their planting, irrigation, and harvesting activities. Some services are beginning to incorporate traditional knowledge indicators alongside meteorological data, creating hybrid forecasting systems that farmers find particularly useful.</p>
        
        <h2>Market Information Systems</h2>
        <p>Price information asymmetry has traditionally disadvantaged rural producers. Mobile apps like "KrishiBazar" now provide daily updates on wholesale prices across major agricultural markets in Nepal. This transparency helps farmers decide when and where to sell their produce, strengthening their bargaining position with traders. Some platforms have evolved to facilitate direct connections between farmers and institutional buyers, bypassing traditional market intermediaries.</p>
        
        <h2>Agricultural Advisory Services</h2>
        <p>With limited access to agricultural extension officers, mobile applications are filling critical knowledge gaps. The "SmartKrishi" app provides pest and disease identification through uploaded photos, suggesting appropriate management strategies. Other applications offer crop-specific guidance on everything from seed selection to post-harvest handling, often with instructional videos that overcome literacy barriers.</p>
        
        <h2>Digital Financial Services</h2>
        <p>Mobile banking and payment systems are revolutionizing rural finance. Farmers can now receive payments digitally, access credit, and purchase inputs without traveling to distant bank branches. Some innovative programs link weather data to insurance products, automatically triggering payouts when rainfall falls below certain thresholds – protecting farmers from climate-related crop failures.</p>
        
        <h2>Challenges and Opportunities</h2>
        <p>Despite rapid growth, digital agriculture faces challenges including network connectivity issues in mountain regions, digital literacy gaps, and ensuring content is available in local languages. Community-based approaches where digitally proficient "info-mediaries" help connect others to digital resources have proven effective in bridging these divides. As connectivity improves and more services are developed, the digital revolution promises to accelerate agricultural development across Nepal's diverse farming systems.</p>
      `
    },
    {
      id: "8",
      title: "Organic Vegetable Farming Success Stories from Kathmandu Valley",
      author: "Sushila Tamang",
      date: "8 Apr 2024",
      description: "How farmers near Kathmandu are meeting growing urban demand for organic, locally grown vegetables through innovative practices...",
      image: "https://images.unsplash.com/photo-1567106367129-2a3c095acde4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>On the outskirts of Kathmandu, a green revolution is taking place as farmers convert conventional vegetable plots into thriving organic operations. Driven by growing urban demand for chemical-free produce and premium price opportunities, these peri-urban farmers are pioneering sustainable production methods that combine traditional knowledge with modern techniques.</p>
        
        <h2>Integrated Farming Systems</h2>
        <p>Successful organic vegetable farmers in the valley have embraced integrated farming approaches. Ram Bahadur Tamang's one-hectare farm in Godavari exemplifies this model: vegetables are grown in rotation with nitrogen-fixing legumes, while chickens and goats provide manure for composting. This closed-loop system minimizes external inputs while maximizing productivity from limited land.</p>
        
        <h2>Innovative Pest Management</h2>
        <p>Without chemical pesticides, organic farmers have developed sophisticated ecological pest management strategies. Common practices include companion planting of pest-repellent herbs like marigold and basil among vegetables, using neem-based botanical sprays, and installing pheromone traps for monitoring and controlling insect populations. These methods maintain ecological balance while keeping pest damage below economic thresholds.</p>
        
        <h2>Protected Cultivation</h2>
        <p>To extend growing seasons and protect crops from increasingly unpredictable weather, many farmers have invested in simple protective structures. Low-cost plastic tunnels allow for year-round production of high-value crops like tomatoes and cucumbers. Some innovative farmers have developed modified designs using locally available bamboo that can withstand monsoon winds better than conventional structures.</p>
        
        <h2>Direct Marketing Channels</h2>
        <p>Perhaps the most transformative innovation has been in marketing. Bypassing traditional wholesale markets, organic vegetable producers have established direct connections with urban consumers through weekly farmers' markets, community-supported agriculture subscriptions, and restaurant partnerships. The Kathmandu Organic Farmers' Collective now operates three weekly markets across the city, where farmers sell directly to consumers at premium prices.</p>
        
        <h2>Certification and Trust Systems</h2>
        <p>While formal organic certification remains challenging for smallholders, innovative participatory guarantee systems (PGS) have emerged. These locally-focused quality assurance systems involve regular peer inspections among farmer groups, building trust and accountability. The successful "Organic Nepal" PGS now includes over 200 farmers across the valley and has gained recognition from consumers and institutional buyers.</p>
      `
    },
    {
      id: "9",
      title: "Beekeeping as Sustainable Livelihood in Nepal's Foothills",
      author: "Mohan Lama",
      date: "3 Apr 2024",
      description: "The growing beekeeping industry in Nepal, contributing to pollination, honey production, and additional income for smallholder farmers...",
      image: "https://images.unsplash.com/photo-1587382060906-770bc99cae43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Across Nepal's mid-hills, beekeeping is emerging as a sustainable livelihood option that complements traditional farming, enhances crop pollination, and provides valuable income with minimal land requirements. From small backyard operations to commercial apiaries, the sector is creating buzz among farmers looking to diversify.</p>
        
        <h2>Indigenous and Modern Beekeeping</h2>
        <p>Nepal has a rich tradition of indigenous beekeeping, particularly with the native <em>Apis cerana</em> bee kept in traditional log or wall hives. While these practices continue, many farmers are now adopting modern movable-frame hives and techniques. Some innovative beekeepers maintain both systems – traditional hives for resilience and cultural continuity alongside modern hives for increased honey production.</p>
        
        <h2>Diversity of Honey Products</h2>
        <p>The country's varied elevations and flora create distinctive honey varieties with unique properties. The highly-prized "mad honey" from cliff bees (<em>Apis laboriosa</em>) in remote mountain areas can fetch premium prices in international markets. Meanwhile, commercial producers in the mid-hills specialize in seasonal varieties like chiuri (Nepal butter tree) honey, mustard honey, and multi-floral spring honey – each with characteristic colors, flavors, and medicinal properties.</p>
        
        <h2>Beyond Honey: Diversified Bee Products</h2>
        <p>Forward-thinking beekeepers are diversifying beyond honey to other valuable bee products. Beeswax is processed into cosmetics and candles, while propolis and royal jelly are marketed for their health benefits. Some entrepreneurs have developed value-added product lines including honey-based beverages, confections, and personal care items that command higher prices than raw honey alone.</p>
        
        <h2>Pollination Services</h2>
        <p>The ecological value of bees for crop pollination is gaining recognition among farmers. In Kavre district, apple and kiwi orchards now contract with beekeepers to bring hives during flowering season, significantly improving fruit set and quality. Research by Nepal Agricultural Research Council shows yield increases of up to 40% in certain vegetable crops with adequate bee pollination.</p>
        
        <h2>Challenges and Support Systems</h2>
        <p>Beekeepers face challenges including climate change impacts on flowering patterns, pesticide use in farming areas, and disease management. To address these issues, the National Beekeeping Center provides training and technical support, while beekeeper associations facilitate knowledge sharing and collective marketing. With appropriate support, beekeeping offers a climate-resilient livelihood option that contributes to both agricultural productivity and ecosystem health across Nepal.</p>
      `
    },
    {
      id: "10",
      title: "Cardamom Farming: Nepal's High-Value Cash Crop Changing Lives",
      author: "Prakash Magar",
      date: "28 Mar 2024",
      description: "How large cardamom cultivation is providing lucrative opportunities for farmers in eastern Nepal's hills and improving livelihoods...",
      image: "https://images.unsplash.com/photo-1622821775081-0a85aeec5e02?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>In the eastern hills of Nepal, large cardamom (Amomum subulatum) has emerged as a transformative cash crop that has lifted thousands of farming families out of poverty. Often called "black gold," this high-value spice is well-suited to the region's agro-ecological conditions and has become Nepal's most valuable agricultural export.</p>
        
        <h2>Perfect Growing Conditions</h2>
        <p>Large cardamom thrives in the moist, shaded conditions of Nepal's eastern hills between 600-2000 meters altitude. Traditionally grown under natural forest cover or alongside nitrogen-fixing Himalayan alder trees, cardamom cultivation helps maintain forest cover while generating significant income. This agroforestry system prevents soil erosion on steep slopes and preserves watershed functions – demonstrating how economic and environmental benefits can align.</p>
        
        <h2>Economic Impact</h2>
        <p>The economic returns from cardamom far exceed those of traditional cereal crops. One hectare of well-managed cardamom can generate 5-10 times the income of traditional maize or millet cultivation on the same land. In districts like Taplejung, Panchthar, and Ilam, cardamom has financed improved housing, education for children, and investment in other businesses. Many successful cardamom farmers have diversified into tea cultivation, livestock, or small enterprises.</p>
        
        <h2>Production Challenges</h2>
        <p>Despite its potential, cardamom cultivation faces significant challenges. Viral diseases, particularly "chirke" and "furke," have devastated plantations in some areas. Climate change is altering rainfall patterns and introducing new pest pressures. To address these issues, research institutions are developing disease-resistant varieties and improved management practices, while farmer field schools provide hands-on training in integrated pest management.</p>
        
        <h2>Value Chain Development</h2>
        <p>Historically, Nepal's cardamom value chain was characterized by numerous intermediaries and limited value addition. Recent initiatives have focused on improving drying technology (replacing traditional smoke drying with improved kilns that produce higher quality product), establishing farmer-owned processing facilities, and developing direct market linkages. Some cooperatives now handle cleaning, grading, packaging, and direct export, capturing more value for producers.</p>
        
        <h2>Future Prospects</h2>
        <p>While market price volatility remains a challenge, the long-term outlook for Nepali cardamom is positive. The country's cardamom is recognized for its superior quality and distinct flavor profile. Efforts to establish geographical indication protection and organic certification could further differentiate Nepali cardamom in international markets. With appropriate research, extension support, and market development, this aromatic spice will continue to be a cornerstone of rural prosperity in eastern Nepal.</p>
      `
    }
  ];

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Sample related posts for sidebar
  const relatedPosts = [
    {
      id: 1,
      title: "How Climate Change is Affecting Nepal's Agricultural Calendar",
      date: "16 May 2024",
      image: "https://images.unsplash.com/photo-1516467790521-c282362926a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Traditional Farming Tools of Nepal: Heritage and Evolution",
      date: "12 May 2024", 
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Youth in Agriculture: Reversing Migration Through Innovation",
      date: "8 May 2024",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Use the tech design for all posts
  const postDesign = "tech";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white">
              {/* Heading at the top */}
              <header className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {post.description}
                </p>
              </header>

              {/* Large image below heading */}
              <div className="mb-8">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>

              {/* Author info and date */}
              <div className="flex items-center gap-6 text-gray-500 text-sm mb-8 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>
              
              {/* Text content below image */}
              <div className="prose prose-lg prose-gray max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed space-y-6 text-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Articles */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex gap-4">
                      <div className="w-20 h-16 flex-shrink-0 overflow-hidden">
                        <img 
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer mb-1">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-gray-500">{relatedPost.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;