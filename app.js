// Function to safely check authentication status
function checkAuthGuard() {
  const loggedUser = sessionStorage.getItem("current_logged_user");
  const currentPage = document.body ? document.body.dataset.page : "";

  if (!loggedUser && currentPage !== "auth" && !window.location.pathname.endsWith("auth.html")) {
    window.location.href = "auth.html";
  }
}

// 7-Tier Refuge Level Progression Calculator
function getRefugeTierInfo(points) {
  if (points >= 1200) {
    return { level: 7, title: "Master Oasis Corridor 👑", badgeClass: "tier-7" };
  } else if (points >= 800) {
    return { level: 6, title: "Certified Bio-Refuge 🛡️", badgeClass: "tier-6" };
  } else if (points >= 500) {
    return { level: 5, title: "Flyway Sanctuary 🦅", badgeClass: "tier-5" };
  } else if (points >= 300) {
    return { level: 4, title: "Urban Haven 🏡", badgeClass: "tier-4" };
  } else if (points >= 150) {
    return { level: 3, title: "Active Rest Stop 💧", badgeClass: "tier-3" };
  } else if (points >= 50) {
    return { level: 2, title: "Pocket Habitat 🌿", badgeClass: "tier-2" };
  } else {
    return { level: 1, title: "Seedling Spot 🌱", badgeClass: "tier-1" };
  }
}

// Comprehensive NC-13 Ecosystem Matchmaker Database
const ECOSYSTEM_MATCHMAKER = {
  // --- BIRDS ---
  "Eastern Bluebird": {
    type: "bird",
    desc: "Eastern Bluebirds rely heavily on insects during summer breeding, foraging caterpillars off native leaves. In fall and winter, they switch to energy-rich native berries to survive freezing weather.",
    pairings: ["American Beautyberry", "Flowering Dogwood", "Spicebush"],
    tip: "Leave native berry bushes unpruned in winter to give bluebirds crucial cold-weather energy!"
  },
  "Northern Cardinal": {
    type: "bird",
    desc: "Year-round NC residents, Northern Cardinals feed on large native seeds and nest in dense, prickly thickets that shield nestlings from urban predators.",
    pairings: ["Purple Coneflower", "Black-eyed Susan", "Spicebush"],
    tip: "Keep dried coneflower seed heads intact through winter—cardinals love feeding on them directly!"
  },
  "Carolina Chickadee": {
    type: "bird",
    desc: "Chickadees require up to 9,000 caterpillars to raise a single clutch of eggs! They actively forage caterpillar larvae hosted on native foliage.",
    pairings: ["Butterfly Weed", "Spicebush", "Flowering Dogwood"],
    tip: "Avoid garden pesticides—chickadees depend on native leaf caterpillars to feed their chicks!"
  },
  "Ruby-throated Hummingbird": {
    type: "bird",
    desc: "NC's tiny migratory nectar feeder, the Ruby-throated Hummingbird fuels its trans-Gulf flight by visiting native tubular flowers rich in natural nectar.",
    pairings: ["Trumpet Honeysuckle", "Cardinal Flower", "Coral Honeysuckle"],
    tip: "Plant bright red native tubular flowers to attract hummingbirds naturally without sugar-water feeders!"
  },
  "Pine Warbler": {
    type: "bird",
    desc: "Pine-obligate songbirds that nest high in evergreen canopies across central NC. They glean insects off pine needles and feed on native pine cone seeds.",
    pairings: ["Loblolly Pine", "Longleaf Pine", "Crossvine"],
    tip: "Preserving mature pine stands in backyards creates vital shelter for migrating Pine Warblers!"
  },
  "American Robin": {
    type: "bird",
    desc: "Robins search damp soil for worms during spring and turn to high-fat native fruits in autumn to store energy for migration.",
    pairings: ["American Beautyberry", "Elderberry", "Flowering Dogwood"],
    tip: "Maintain a small leaf-litter zone in your yard so robins can forage for soil invertebrates!"
  },
  "Tufted Titmouse": {
    type: "bird",
    desc: "Acorn and seed hoarders, Titmice pluck seeds from native plants and cache them under tree bark for winter reserves.",
    pairings: ["Purple Coneflower", "Black-eyed Susan", "Loblolly Pine"],
    tip: "Setting up a native seed feeder alongside coneflowers creates an active foraging station!"
  },
  "Red-headed Woodpecker": {
    type: "bird",
    desc: "Striking cavity nesters that thrive in oak savanna habitats across Johnston and Lee counties, storing pine nuts and acorns in dead snag trees.",
    pairings: ["Loblolly Pine", "Longleaf Pine", "American Beautyberry"],
    tip: "Leave safe dead tree trunks (snags) standing to provide nesting cavities for woodpeckers!"
  },
  "Carolina Wren": {
    type: "bird",
    desc: "Energetic insectivores that hunt for spiders and beetles hidden inside thick native vines and brush piles.",
    pairings: ["Crossvine", "Trumpet Honeysuckle", "American Beautyberry"],
    tip: "Build a small wood or brush pile in a quiet corner of your garden to offer cozy wren habitat!"
  },
  "Brown-headed Nuthatch": {
    type: "bird",
    desc: "Specialized NC pine-savanna birds known for using pine needles as tools to pry open tree bark for insects.",
    pairings: ["Longleaf Pine", "Wiregrass", "Loblolly Pine"],
    tip: "Retaining native longleaf and loblolly pines helps protect this declining local species!"
  },
  "Summer Tanager": {
    type: "bird",
    desc: "Bee and wasp specialists, Summer Tanagers nest in open pine-oak canopies and pluck stinging insects right out of the air near native flowers.",
    pairings: ["Wild Indigo", "Trumpet Honeysuckle", "Longleaf Pine"],
    tip: "Native flowering meadows attract beneficial pollinators that Summer Tanagers feed on!"
  },
  "Eastern Towhee": {
    type: "bird",
    desc: "Ground-dwelling birds that scratch double-footed through fallen native leaf litter to uncover beetles, spiders, and seeds.",
    pairings: ["Wiregrass", "Wild Indigo", "Black-eyed Susan"],
    tip: "Leave autumn leaves under garden shrubs instead of bagging them to create rich towhee habitat!"
  },
  "Barred Owl": {
    type: "bird",
    desc: "Nocturnal predators that nest in mature hollow hardwoods along swampy river basins like the Neuse and Cape Fear rivers.",
    pairings: ["Loblolly Pine", "Flowering Dogwood", "Buttonbush"],
    tip: "Protecting mature trees along stream corridors ensures owls have safe daytime roosting spots!"
  },
  "Wood Thrush": {
    type: "bird",
    desc: "Known for their flute-like song, Wood Thrushes forage in shady leaf litter under damp forest understories for snails and insects.",
    pairings: ["Mapleleaf Viburnum", "Sweet Goldenrod", "Spicebush"],
    tip: "Planting layered native shrubs creates cool, moist understory shade essential for thrushes!"
  },
  "Yellow-billed Cuckoo": {
    type: "bird",
    desc: "Caterpillar specialists that consume spiny caterpillars that other birds avoid, nesting in dense canopy foliage.",
    pairings: ["Mapleleaf Viburnum", "Heartleaf Aster", "Flowering Dogwood"],
    tip: "Planting native viburnums provides dense nesting cover and abundant caterpillar prey!"
  },
  "Whip-poor-will": {
    type: "bird",
    desc: "Nocturnal aerial insectivores that nest directly on dry forest leaf litter and hunt moths over open night meadows.",
    pairings: ["Elderberry", "Buttonbush", "Joe-Pye Weed"],
    tip: "Reducing outdoor night lighting helps preserve night-flying moths that Whip-poor-wills eat!"
  },
  "Swainson's Warbler": {
    type: "bird",
    desc: "Secretive swamp-dwelling warblers that use their strong bills to flip over damp leaf litter, hunting spiders and insect larvae in dense bottomland thickets.",
    pairings: ["Switchcane", "Sweetgum", "Fothergilla"],
    tip: "Preserving undisturbed damp woodlands and thick bottomland undergrowth protects Swainson's Warbler habitat!"
  },
  "Hooded Warbler": {
    type: "bird",
    desc: "Active canopy-edge gleaners that dart among dense shrub layers to capture flying insects near forest openings.",
    pairings: ["Mapleleaf Viburnum", "Spicebush", "Flowering Dogwood"],
    tip: "Maintaining diverse forest understories supports successful warbler breeding seasons!"
  },
  "Red-tailed Hawk": {
    type: "bird",
    desc: "Majestic raptors soaring over open fields and highways across NC-13, perching on tall snags to spot small mammals.",
    pairings: ["Loblolly Pine", "Longleaf Pine", "Flowering Dogwood"],
    tip: "Avoiding rodenticides keeps local hawks safe from secondary poisoning!"
  },
  "Blue-gray Gnatcatcher": {
    type: "bird",
    desc: "Tiny, restless insect hunters that weave delicate spiderweb nests in hardwood trees and glean tiny aphids off leaves.",
    pairings: ["Flowering Dogwood", "Sweet Goldenrod", "Mapleleaf Viburnum"],
    tip: "Providing pesticide-free gardens ensures gnatcatchers have plenty of small insects to eat!"
  },
  "Great Blue Heron": {
    type: "bird",
    desc: "Patient wetland waders that stalk fish and amphibians along the edges of rivers, lakes, and reservoirs in Person and Wake counties.",
    pairings: ["Buttonbush", "Elderberry", "Swamp Rosemallow"],
    tip: "Protecting natural shoreline vegetation preserves critical foraging zones for herons!"
  },
  "Wood Duck": {
    type: "bird",
    desc: "Perched tree-ducks that nest in hollow cavities over water, feeding on acorns, seeds, and aquatic plants.",
    pairings: ["Buttonbush", "Elderberry", "Loblolly Pine"],
    tip: "Installing wooden nest boxes near ponds helps boost local Wood Duck populations!"
  },
  "Belted Kingfisher": {
    type: "bird",
    desc: "Rattling coastal-plain birds that dive headfirst into streams and lakes to catch small fish from streamside perches.",
    pairings: ["Buttonbush", "Elderberry", "Loblolly Pine"],
    tip: "Keeping stream banks natural and un-channeled prevents erosion and supports fish populations!"
  },
  "Cedar Waxwing": {
    type: "bird",
    desc: "Sociable fruit-eating nomads that travel in flocks, feeding heavily on late-season berries in native trees and shrubs.",
    pairings: ["American Beautyberry", "Flowering Dogwood", "Elderberry"],
    tip: "Planting native fruit trees ensures winter flocks have plenty of natural food sources!"
  },
  "Northern Bobwhite": {
    type: "bird",
    desc: "Ground-dwelling quail known for their iconic 'bob-white' whistle, foraging for weed seeds and insects in grassy fields.",
    pairings: ["Wiregrass", "Wild Indigo", "Black-eyed Susan"],
    tip: "Creating wild field borders with native bunchgrasses gives quail vital nesting cover!"
  },

  // --- PLANTS ---
  "American Beautyberry": {
    type: "plant",
    desc: "Produces vibrant purple autumn berries packed with moisture and nutrients, serving as a critical energy stopover for migrating songbirds.",
    pairings: ["Eastern Bluebird", "American Robin", "Northern Cardinal"],
    tip: "Plant Beautyberry near sunny borders to create an autumn bird feeding station!"
  },
  "Purple Coneflower": {
    type: "plant",
    desc: "A powerhouse native flower! Bees and butterflies nectar on summer blooms, while finches and cardinals strip seed heads all winter long.",
    pairings: ["Northern Cardinal", "Tufted Titmouse", "Carolina Chickadee"],
    tip: "Do not cut down dead flower stalks in fall—the seed heads feed birds through snow!"
  },
  "Trumpet Honeysuckle": {
    type: "plant",
    desc: "A non-invasive native vine featuring tubular red flowers specially shaped for hummingbird beaks to collect high-energy nectar.",
    pairings: ["Ruby-throated Hummingbird", "Carolina Wren", "Summer Tanager"],
    tip: "Train this vine up a sunny fence or trellis near a window for incredible bird watching!"
  },
  "Butterfly Weed": {
    type: "plant",
    desc: "Essential host plant for caterpillars that parent songbirds collect to feed nestlings, plus rich nectar for adult pollinators.",
    pairings: ["Carolina Chickadee", "Eastern Bluebird", "Ruby-throated Hummingbird"],
    tip: "Plant in full sun and well-drained soil to build a thriving caterpillar nursery!"
  },
  "Black-eyed Susan": {
    type: "plant",
    desc: "Durable native wildflowers providing abundant summer nectar and dense autumn seed clusters for seed-eating birds.",
    pairings: ["Northern Cardinal", "Tufted Titmouse", "Eastern Towhee"],
    tip: "Allow plants to naturally drop seed to form expanding native meadow patches!"
  },
  "Spicebush": {
    type: "plant",
    desc: "Understory shrub supporting swallowtail caterpillars in summer and producing high-fat red berries for migrating thrushes in fall.",
    pairings: ["Eastern Bluebird", "Carolina Chickadee", "Wood Thrush"],
    tip: "Thrives in partial shade—perfect for planting along wooded fence lines!"
  },
  "Flowering Dogwood": {
    type: "plant",
    desc: "North Carolina's state tree! High-calcium spring blooms support insects, while glossy red fall berries feed over 35 songbird species.",
    pairings: ["Eastern Bluebird", "American Robin", "Yellow-billed Cuckoo"],
    tip: "Plant under larger canopy trees to mimic its natural NC forest understory position!"
  },
  "Cardinal Flower": {
    type: "plant",
    desc: "Brilliant scarlet spikes produce rich nectar, making it a favorite feeding stop for southward-migrating hummingbirds in late summer.",
    pairings: ["Ruby-throated Hummingbird", "Summer Tanager", "Carolina Wren"],
    tip: "Requires moist soil—ideal for planting near birdbaths or rain gardens!"
  },
  "Loblolly Pine": {
    type: "plant",
    desc: "Keystone evergreen tree offering crucial winter wind shelter, roosting sites, and pine cone seeds for native birds.",
    pairings: ["Pine Warbler", "Brown-headed Nuthatch", "Barred Owl"],
    tip: "Maintain pine needle mulch under trees to create natural foraging ground cover!"
  },
  "Longleaf Pine": {
    type: "plant",
    desc: "Historic NC Sandhills pine species supporting rare nuthatches and woodpeckers with nest cavities and giant seed cones.",
    pairings: ["Brown-headed Nuthatch", "Red-headed Woodpecker", "Summer Tanager"],
    tip: "Longleaf pines live for centuries and form the backbone of central NC pine ecosystems!"
  },
  "Crossvine": {
    type: "plant",
    desc: "Early spring bloomer offering orange-red trumpet flowers that feed returning hummingbirds before other flowers open.",
    pairings: ["Ruby-throated Hummingbird", "Carolina Wren", "Pine Warbler"],
    tip: "Provides thick evergreen foliage that gives wrens winter shelter!"
  },
  "Wiregrass": {
    type: "plant",
    desc: "Native bunchgrass providing protective ground shelter and insect foraging zones for ground-feeding songbirds.",
    pairings: ["Eastern Towhee", "Brown-headed Nuthatch", "Northern Bobwhite"],
    tip: "Plant in dry, sunny areas to create natural ground-cover protection!"
  },
  "Wild Indigo": {
    type: "plant",
    desc: "Deep-rooted native perennial supporting native caterpillars and bumblebees, generating seed pods for songbirds.",
    pairings: ["Summer Tanager", "Eastern Towhee", "Carolina Chickadee"],
    tip: "Once established, Wild Indigo is drought-hardy and blooms year after year!"
  },
  "Elderberry": {
    type: "plant",
    desc: "Fast-growing shrub producing massive clusters of dark berries in late summer, providing a feast for fruit-eating songbirds.",
    pairings: ["American Robin", "Whip-poor-will", "Cedar Waxwing"],
    tip: "Elderberries love moist ground—great for natural wetland borders!"
  },
  "Buttonbush": {
    type: "plant",
    desc: "Moisture-loving shrub with globe-like flowers attracting butterflies and water birds along creek edges.",
    pairings: ["Great Blue Heron", "Wood Duck", "Whip-poor-will"],
    tip: "Plant along pond edges or low spots that hold water after rain!"
  },
  "Mapleleaf Viburnum": {
    type: "plant",
    desc: "Shade-tolerant forest shrub providing caterpillar habitat and dark purple berries for deep-forest thrushes.",
    pairings: ["Wood Thrush", "Yellow-billed Cuckoo", "Eastern Towhee"],
    tip: "Excellent native choice for shaded backyards with heavy tree canopy!"
  },
  "Heartleaf Aster": {
    type: "plant",
    desc: "Delicate woodland aster providing late-season nectar for migrating pollinators and seeds for small birds.",
    pairings: ["Yellow-billed Cuckoo", "Wood Thrush", "Carolina Chickadee"],
    tip: "Tolerates deep shade, making it a wonderful woodland garden addition!"
  },
  "Calico Aster": {
    type: "plant",
    desc: "Abundant starry white blooms that supply essential late-autumn nectar before winter freezes.",
    pairings: ["Yellow-billed Cuckoo", "Eastern Towhee", "Northern Cardinal"],
    tip: "Grows easily in borders and attracts beneficial native pollinators!"
  },
  "Orange Coneflower": {
    type: "plant",
    desc: "Golden petals and dark central cones supplying rich summer nectar and nutritious winter seeds.",
    pairings: ["Northern Cardinal", "American Goldfinch", "Tufted Titmouse"],
    tip: "Extremely drought-resistant once established in garden beds!"
  },
  "Tall Blue Wild Indigo": {
    type: "plant",
    desc: "Stately perennial legume fixing soil nitrogen while hosting specialized insect larvae for birds.",
    pairings: ["Summer Tanager", "Carolina Chickadee", "Eastern Bluebird"],
    tip: "Features striking blue foliage and seed pods that rattle in autumn breeze!"
  },
  "Wild Strawberry": {
    type: "plant",
    desc: "Low-growing ground cover producing sweet berries relished by ground-foraging birds.",
    pairings: ["Wood Thrush", "Eastern Towhee", "American Robin"],
    tip: "Makes an incredible, eco-friendly living lawn replacement in shady spots!"
  },
  "Sweet Goldenrod": {
    type: "plant",
    desc: "Golden autumn spikes that support scores of native insect species vital for migrating songbirds.",
    pairings: ["Wood Thrush", "Blue-gray Gnatcatcher", "Carolina Wren"],
    tip: "Anise-scented leaves can be brewed into a soothing herbal tea!"
  },
  "Swamp Rosemallow": {
    type: "plant",
    desc: "Magnificent native hibiscus with giant blooms providing sanctuary for wetland insects and birds.",
    pairings: ["Great Blue Heron", "Swamp Sparrow", "Red-winged Blackbird"],
    tip: "Plant in rain gardens or wet drainage areas for stunning summer color!"
  },
  "New Jersey Tea": {
    type: "plant",
    desc: "Compact deciduous shrub with white flower clusters that attract diverse insect pollinators.",
    pairings: ["Carolina Chickadee", "Eastern Bluebird", "Northern Cardinal"],
    tip: "Deep taproots make it remarkably resistant to summer dry spells!"
  },
  "Bluestem Goldenrod": {
    type: "plant",
    desc: "Wand-like golden blossoms winding along stems, offering late-season sustenance for local wildlife.",
    pairings: ["Wood Thrush", "Carolina Wren", "Pine Warbler"],
    tip: "Thrives effortlessly in wooded shade gardens and natural borders!"
  },
  "Passionflower": {
    type: "plant",
    desc: "Exotic-looking native vine producing intricate blooms and nutritious autumn fruit for wildlife.",
    pairings: ["Summer Tanager", "Carolina Wren", "Northern Cardinal"],
    tip: "Train along fences to provide dense shelter and flowers simultaneously!"
  },
  "Wax Myrtle": {
    type: "plant",
    desc: "Aromatic evergreen shrub producing waxy berries eagerly consumed by tree swallows and warblers.",
    pairings: ["Pine Warbler", "Yellow-rumped Warbler", "Eastern Bluebird"],
    tip: "Acts as an exceptional privacy screen that doubles as a bird sanctuary!"
  },
  "Elderberry": {
    type: "plant",
    desc: "Fast-growing shrub producing massive clusters of dark berries in late summer, providing a feast for fruit-eating songbirds.",
    pairings: ["American Robin", "Whip-poor-will", "Cedar Waxwing"],
    tip: "Elderberries love moist ground—great for natural wetland borders!"
  },
  "Wild Geranium": {
    type: "plant",
    desc: "Lovely pink spring woodland wildflower providing early nectar for emerging pollinators.",
    pairings: ["Carolina Chickadee", "Wood Thrush", "Blue-gray Gnatcatcher"],
    tip: "Forms lovely green carpet mats under shade trees in spring!"
  },
  "Narrowleaf Sundrops": {
    type: "plant",
    desc: "Bright yellow evening-primrose relative opening sunny cups that attract beneficial daytime insects.",
    pairings: ["Eastern Bluebird", "Northern Cardinal", "Indigo Bunting"],
    tip: "Prefers sunny meadows and open woodland borders!"
  },
  "Coral Honeysuckle": {
    type: "plant",
    desc: "Climbing native vine with coral-red trumpet flowers that bloom all summer long for hummingbirds.",
    pairings: ["Ruby-throated Hummingbird", "Carolina Wren", "American Robin"],
    tip: "Unlike invasive Japanese honeysuckle, this native variety behaves politely in gardens!"
  }
};

const TOWN_SPECIES_DATA = {
  "Caswell": {
    birds: [
      { name: "Yellow-billed Cuckoo", img: "assets/images/birds/yellow-billed-cuckoo.jpg" },
      { name: "Hooded Warbler", img: "assets/images/birds/hooded-warbler.jpg" },
      { name: "Eastern Bluebird", img: "assets/images/birds/eastern-bluebird.jpg" },
      { name: "Red-headed Woodpecker", img: "assets/images/birds/red-headed-woodpecker.jpg" },
      { name: "Swainson's Warbler", img: "assets/images/birds/swainsons-warbler.jpg" },
      { name: "Wood Thrush", img: "assets/images/birds/wood-thrush.jpg" }
    ],
    plants: [
      { name: "Heartleaf Aster", img: "assets/images/plants/heartleaf-aster.jpg" },
      { name: "Calico Aster", img: "assets/images/plants/calico-aster.jpg" },
      { name: "Mapleleaf Viburnum", img: "assets/images/plants/mapleleaf-viburnum.jpg" },
      { name: "Orange Coneflower", img: "assets/images/plants/orange-coneflower.jpg" },
      { name: "Tall Blue Wild Indigo", img: "assets/images/plants/tall-blue-wild-indigo.jpg" },
      { name: "Wild Strawberry", img: "assets/images/plants/wild-strawberry.jpg" }
    ]
  },
  "Franklin": {
    birds: [
      { name: "Northern Cardinal", img: "assets/images/birds/northern-cardinal.jpg" },
      { name: "Eastern Bluebird", img: "assets/images/birds/eastern-bluebird.jpg" },
      { name: "Carolina Wren", img: "assets/images/birds/carolina-wren.jpg" },
      { name: "Red-tailed Hawk", img: "assets/images/birds/red-tailed-hawk.jpg" },
      { name: "Pine Warbler", img: "assets/images/birds/pine-warbler.jpg" },
      { name: "Ruby-throated Hummingbird", img: "assets/images/birds/ruby-throated-hummingbird.jpg" }
    ],
    plants: [
      { name: "American Beautyberry", img: "assets/images/plants/american-beautyberry.jpg" },
      { name: "Flowering Dogwood", img: "assets/images/plants/flowering-dogwood.jpg" },
      { name: "Purple Coneflower", img: "assets/images/plants/purple-coneflower.jpg" },
      { name: "Trumpet Honeysuckle", img: "assets/images/plants/trumpet-honeysuckle.jpg" },
      { name: "Black-eyed Susan", img: "assets/images/plants/black-eyed-susan.jpg" },
      { name: "Butterfly Weed", img: "assets/images/plants/butterfly-weed.jpg" }
    ]
  },
  "Granville": {
    birds: [
      { name: "Wood Thrush", img: "assets/images/birds/wood-thrush.jpg" },
      { name: "Eastern Towhee", img: "assets/images/birds/eastern-towhee.jpg" },
      { name: "Carolina Chickadee", img: "assets/images/birds/carolina-chickadee.jpg" },
      { name: "Tufted Titmouse", img: "assets/images/birds/tufted-titmouse.jpg" },
      { name: "Red-shouldered Hawk", img: "assets/images/birds/red-shouldered-hawk.jpg" },
      { name: "Blue-gray Gnatcatcher", img: "assets/images/birds/blue-gray-gnatcatcher.jpg" }
    ],
    plants: [
      { name: "Sweet Goldenrod", img: "assets/images/plants/sweet-goldenrod.jpg" },
      { name: "Mapleleaf Viburnum", img: "assets/images/plants/mapleleaf-viburnum.jpg" },
      { name: "Swamp Rosemallow", img: "assets/images/plants/swamp-rosemallow.jpg" },
      { name: "New Jersey Tea", img: "assets/images/plants/new-jersey-tea.jpg" },
      { name: "Bluestem Goldenrod", img: "assets/images/plants/bluestem-goldenrod.jpg" },
      { name: "Wild Strawberry", img: "assets/images/plants/wild-strawberry.jpg" }
    ]
  },
  "Harnett": {
    birds: [
      { name: "Summer Tanager", img: "assets/images/birds/summer-tanager.jpg" },
      { name: "Brown-headed Nuthatch", img: "assets/images/birds/brown-headed-nuthatch.jpg" },
      { name: "Eastern Towhee", img: "assets/images/birds/eastern-towhee.jpg" },
      { name: "Carolina Chickadee", img: "assets/images/birds/carolina-chickadee.jpg" },
      { name: "Red-tailed Hawk", img: "assets/images/birds/red-tailed-hawk.jpg" },
      { name: "Ruby-throated Hummingbird", img: "assets/images/birds/ruby-throated-hummingbird.jpg" }
    ],
    plants: [
      { name: "Wiregrass", img: "assets/images/plants/wiregrass.jpg" },
      { name: "Longleaf Pine", img: "assets/images/plants/longleaf-pine.jpg" },
      { name: "Wild Indigo", img: "assets/images/plants/wild-indigo.jpg" },
      { name: "Trumpet Honeysuckle", img: "assets/images/plants/trumpet-honeysuckle.jpg" },
      { name: "Black-eyed Susan", img: "assets/images/plants/black-eyed-susan.jpg" },
      { name: "Passionflower", img: "assets/images/plants/passionflower.jpg" }
    ]
  },
  "Johnston": {
    birds: [
      { name: "Red-headed Woodpecker", img: "assets/images/birds/red-headed-woodpecker.jpg" },
      { name: "Pine Warbler", img: "assets/images/birds/pine-warbler.jpg" },
      { name: "Eastern Bluebird", img: "assets/images/birds/eastern-bluebird.jpg" },
      { name: "Carolina Wren", img: "assets/images/birds/carolina-wren.jpg" },
      { name: "Northern Cardinal", img: "assets/images/birds/northern-cardinal.jpg" },
      { name: "Barred Owl", img: "assets/images/birds/barred-owl.jpg" }
    ],
    plants: [
      { name: "Cardinal Flower", img: "assets/images/plants/cardinal-flower.jpg" },
      { name: "American Beautyberry", img: "assets/images/plants/american-beautyberry.jpg" },
      { name: "Loblolly Pine", img: "assets/images/plants/loblolly-pine.jpg" },
      { name: "Crossvine", img: "assets/images/plants/crossvine.jpg" },
      { name: "Joe-Pye Weed", img: "assets/images/plants/joe-pye-weed.jpg" },
      { name: "Wax Myrtle", img: "assets/images/plants/wax-myrtle.jpg" }
    ]
  },
  "Lee": {
    birds: [
      { name: "Brown-headed Nuthatch", img: "assets/images/birds/brown-headed-nuthatch.jpg" },
      { name: "Pine Warbler", img: "assets/images/birds/pine-warbler.jpg" },
      { name: "Eastern Towhee", img: "assets/images/birds/eastern-towhee.jpg" },
      { name: "Eastern Bluebird", img: "assets/images/birds/eastern-bluebird.jpg" },
      { name: "Red-headed Woodpecker", img: "assets/images/birds/red-headed-woodpecker.jpg" },
      { name: "Ruby-throated Hummingbird", img: "assets/images/birds/ruby-throated-hummingbird.jpg" }
    ],
    plants: [
      { name: "Longleaf Pine", img: "assets/images/plants/longleaf-pine.jpg" },
      { name: "Wiregrass", img: "assets/images/plants/wiregrass.jpg" },
      { name: "American Beautyberry", img: "assets/images/plants/american-beautyberry.jpg" },
      { name: "Crossvine", img: "assets/images/plants/crossvine.jpg" },
      { name: "Wild Indigo", img: "assets/images/plants/wild-indigo.jpg" },
      { name: "Butterfly Weed", img: "assets/images/plants/butterfly-weed.jpg" }
    ]
  },
  "Person": {
    birds: [
      { name: "Whip-poor-will", img: "assets/images/birds/whip-poor-will.jpg" },
      { name: "Great Blue Heron", img: "assets/images/birds/great-blue-heron.jpg" },
      { name: "Wood Duck", img: "assets/images/birds/wood-duck.jpg" },
      { name: "Belted Kingfisher", img: "assets/images/birds/belted-kingfisher.jpg" },
      { name: "Cedar Waxwing", img: "assets/images/birds/cedar-waxwing.jpg" },
      { name: "Northern Bobwhite", img: "assets/images/birds/northern-bobwhite.jpg" }
    ],
    plants: [
      { name: "Elderberry", img: "assets/images/plants/elderberry.jpg" },
      { name: "Buttonbush", img: "assets/images/plants/buttonbush.jpg" },
      { name: "Wild Geranium", img: "assets/images/plants/wild-geranium.jpg" },
      { name: "Narrowleaf Sundrops", img: "assets/images/plants/narrowleaf-sundrops.jpg" },
      { name: "Joe-Pye Weed", img: "assets/images/plants/joe-pye-weed.jpg" },
      { name: "Coral Honeysuckle", img: "assets/images/plants/coral-honeysuckle.jpg" }
    ]
  },
  "Wake": {
    birds: [
      { name: "Eastern Bluebird", img: "assets/images/birds/eastern-bluebird.jpg" },
      { name: "Northern Cardinal", img: "assets/images/birds/northern-cardinal.jpg" },
      { name: "Carolina Chickadee", img: "assets/images/birds/carolina-chickadee.jpg" },
      { name: "Pine Warbler", img: "assets/images/birds/pine-warbler.jpg" },
      { name: "Ruby-throated Hummingbird", img: "assets/images/birds/ruby-throated-hummingbird.jpg" },
      { name: "Tufted Titmouse", img: "assets/images/birds/tufted-titmouse.jpg" }
    ],
    plants: [
      { name: "American Beautyberry", img: "assets/images/plants/american-beautyberry.jpg" },
      { name: "Purple Coneflower", img: "assets/images/plants/purple-coneflower.jpg" },
      { name: "Trumpet Honeysuckle", img: "assets/images/plants/trumpet-honeysuckle.jpg" },
      { name: "Butterfly Weed", img: "assets/images/plants/butterfly-weed.jpg" },
      { name: "Black-eyed Susan", img: "assets/images/plants/black-eyed-susan.jpg" },
      { name: "Spicebush", img: "assets/images/plants/spicebush.jpg" }
    ]
  }
};

const TOWN_ECO_WEIGHTS = {
  "Raleigh": { lossStress: "Critical Need (Urban Dense)", basePercentage: 94, topAction: "Clean Water Bath" },
  "Cary": { lossStress: "High Need (Suburban Development)", basePercentage: 91, topAction: "Plant Native Flora" },
  "Apex": { lossStress: "High Need (Suburban Corridor)", basePercentage: 89, topAction: "Clean Water Bath" },
  "Holly Springs": { lossStress: "Moderate-High Need", basePercentage: 86, topAction: "Stock Native Seed Feeder" },
  "Fuquay-Varina": { lossStress: "Moderate Need (Suburban)", basePercentage: 84, topAction: "Leave Native Seed Heads" },
  "Clayton": { lossStress: "High Need (River Basin Pressure)", basePercentage: 88, topAction: "Clean Water Bath" },
  "Smithfield": { lossStress: "Moderate Need (Agricultural Edge)", basePercentage: 81, topAction: "Plant Native Shrubs" },
  "Lillington": { lossStress: "Moderate Need (Sandhills Edge)", basePercentage: 79, topAction: "Protect Ground Cover" },
  "Sanford": { lossStress: "Moderate Need (Urban Transition)", basePercentage: 83, topAction: "Stock Native Seed Feeder" },
  "Oxford": { lossStress: "Low-Moderate Need (Rural Edge)", basePercentage: 76, topAction: "Leave Native Seed Heads" },
  "Roxboro": { lossStress: "Low Need (Lake & Forest Basin)", basePercentage: 73, topAction: "Clean Water Bath" },
  "Yanceyville": { lossStress: "Low Need (Rural Forest Basin)", basePercentage: 71, topAction: "Protect Native Berry Shrubs" },
  "Louisburg": { lossStress: "Low-Moderate Need (River Basin)", basePercentage: 77, topAction: "Plant Native Flora" }
};

const AVAILABLE_TASKS = [
  { id: "birdbath", title: "Clean or Refill a Birdbath", pts: 25, desc: "Provide clean, fresh drinking water for local songbirds." },
  { id: "feeder", title: "Set Up or Stock a Bird Feeder", pts: 30, desc: "Fill feeders with native seed blends or suet." },
  { id: "plant_native", title: "Plant a Native Flora Species", pts: 50, desc: "Add native flora suited for your local NC-13 town." },
  { id: "water_plant", title: "Water Local Native Plants", pts: 15, desc: "Maintain native gardens during dry seasonal spells." },
  { id: "remove_invasive", title: "Remove Invasive Plant Species", pts: 40, desc: "Clear invasive weeds to allow native plants to thrive." }
];

function getUserState() {
  const loggedUser = sessionStorage.getItem("current_logged_user") || "";
  return {
    loggedUser,
    points: loggedUser ? parseInt(localStorage.getItem(`orniflora_points_${loggedUser}`) || "0") : 0,
    streak: loggedUser ? parseInt(localStorage.getItem(`orniflora_streak_${loggedUser}`) || "0") : 0,
    lastLoggedDate: loggedUser ? localStorage.getItem(`orniflora_lastDate_${loggedUser}`) || "" : "",
    locationKey: `orniflora_location_${loggedUser}`,
    pointsKey: `orniflora_points_${loggedUser}`,
    streakKey: `orniflora_streak_${loggedUser}`,
    dateKey: `orniflora_lastDate_${loggedUser}`,
    historyKey: `orniflora_history_${loggedUser}`,
    createdKey: `orniflora_created_${loggedUser}`
  };
}

function getUserLocationInfo(username) {
  const savedLocation = localStorage.getItem(`orniflora_location_${username}`) || "Holly Springs, Wake Co.";
  let town = "Holly Springs";
  let county = "Wake";

  if (savedLocation.includes(",")) {
    const parts = savedLocation.split(",");
    town = parts[0].trim();
    if (parts[1]) {
      county = parts[1].replace("Co.", "").replace("County", "").trim();
    }
  }

  return { town, county };
}

function renderTownSpecies() {
  const state = getUserState();
  const { town, county } = getUserLocationInfo(state.loggedUser);
  const speciesData = TOWN_SPECIES_DATA[county] || TOWN_SPECIES_DATA["Wake"];

  const townBirdsLabel = document.getElementById("town-birds-label");
  const townPlantsLabel = document.getElementById("town-plants-label");
  if (townBirdsLabel) townBirdsLabel.textContent = `${town} (${county} Co.)`;
  if (townPlantsLabel) townPlantsLabel.textContent = `${town} (${county} Co.)`;

  const birdsContainer = document.getElementById("regional-birds-list");
  const plantsContainer = document.getElementById("regional-plants-list");

  if (birdsContainer) {
    birdsContainer.innerHTML = speciesData.birds.map(bird => `
      <div class="species-card" onclick="inspectSpeciesInteraction('${bird.name.replace(/'/g, "\\'")}')">
        <img src="${bird.img}" alt="${bird.name}" onerror="this.src='assets/images/birds/eastern-bluebird.jpg';">
        <p>${bird.name}</p>
      </div>
    `).join("");
  }

  if (plantsContainer) {
    plantsContainer.innerHTML = speciesData.plants.map(plant => `
      <div class="species-card" onclick="inspectSpeciesInteraction('${plant.name.replace(/'/g, "\\'")}')">
        <img src="${plant.img}" alt="${plant.name}" onerror="this.src='assets/images/plants/purple-coneflower.jpg';">
        <p>${plant.name}</p>
      </div>
    `).join("");
  }
}

// Fixed Dynamic Species Interaction Handler with Robust Fallbacks
function inspectSpeciesInteraction(speciesName) {
  const modal = document.getElementById("ecosystem-modal");
  const titleEl = document.getElementById("eco-modal-title");
  const descEl = document.getElementById("eco-modal-desc");
  const chipEl = document.getElementById("eco-modal-chip");
  const pairingsHeading = document.getElementById("eco-pairings-heading");
  const pairingsList = document.getElementById("eco-pairings-list");
  const tipEl = document.getElementById("eco-modal-tip");

  const data = ECOSYSTEM_MATCHMAKER[speciesName] || {
    type: "plant",
    desc: `${speciesName} plays a vital ecological role in maintaining biodiversity corridors across North Carolina's 13th Congressional District.`,
    pairings: ["Eastern Bluebird", "Northern Cardinal", "Carolina Chickadee"],
    tip: "Plant native flora in clusters to maximize food and shelter for local wildlife!"
  };

  if (titleEl) titleEl.textContent = speciesName;
  if (descEl) descEl.textContent = data.desc;

  if (chipEl) {
    if (data.type === "bird") {
      chipEl.textContent = "🦅 Native Avian Species";
      chipEl.className = "modal-category-chip chip-bird";
      if (pairingsHeading) pairingsHeading.textContent = "🌸 Supported Native Plants & Trees";
    } else {
      chipEl.textContent = "🌿 Native Botanical Species";
      chipEl.className = "modal-category-chip chip-plant";
      if (pairingsHeading) pairingsHeading.textContent = "🐥 Attracted Native Songbirds";
    }
  }

  if (pairingsList) {
    pairingsList.innerHTML = data.pairings.map(item => `
      <span class="pairing-chip">${data.type === "bird" ? "🌸" : "🐥"} ${item}</span>
    `).join("");
  }

  if (tipEl) {
    tipEl.innerHTML = `💡 <strong>Yard Action:</strong> ${data.tip}`;
  }

  if (modal) modal.style.display = "flex";
}

function closeEcoModal() {
  const modal = document.getElementById("ecosystem-modal");
  if (modal) modal.style.display = "none";
}

function renderDynamicSpotlight() {
  const titleEl = document.getElementById("spotlight-title");
  const descEl = document.getElementById("spotlight-desc");
  if (!titleEl || !descEl) return;

  const state = getUserState();
  const { town, county } = getUserLocationInfo(state.loggedUser);

  titleEl.textContent = `📍 Conservation Spotlight: ${town} (${county} County)`;
  descEl.textContent = `Suburban growth across ${county} County fragments local songbird habitat. Adding native plants and clean water in ${town} transforms your property into a vital habitat bridge!`;
}

function renderBioCorridorIndex() {
  const titleEl = document.getElementById("flyway-title");
  const densityEl = document.getElementById("flyway-density");
  const yardLevelEl = document.getElementById("yard-refuge-level");
  const badgeEl = document.getElementById("migration-badge");
  const stressEl = document.getElementById("corridor-stress");
  const tipEl = document.getElementById("corridor-tip");
  const fillEl = document.getElementById("meter-fill");
  const topActionEl = document.getElementById("top-recommended-action");

  if (!densityEl) return;

  const state = getUserState();
  const { town } = getUserLocationInfo(state.loggedUser);
  const points = state.points;
  const currentMonth = new Date().getMonth();

  const townFactors = TOWN_ECO_WEIGHTS[town] || { 
    lossStress: "Moderate Need", 
    basePercentage: 82, 
    topAction: "Clean Water Bath" 
  };

  let seasonalMultiplier = [2, 3, 4, 7, 8, 9, 10].includes(currentMonth) ? 1.08 : 0.85;
  let seasonLabel = [2, 3, 4, 7, 8, 9, 10].includes(currentMonth) ? "🔥 Peak Migration Month" : "Off-Peak Season";
  let calculatedPercentage = Math.min(98, Math.round(townFactors.basePercentage * seasonalMultiplier));

  const tierInfo = getRefugeTierInfo(points);

  if (titleEl) titleEl.textContent = `🦅 ${town} Bird Migration Status`;
  densityEl.textContent = `${seasonLabel} (${calculatedPercentage}%)`;
  if (fillEl) fillEl.style.width = `${calculatedPercentage}%`;
  if (stressEl) stressEl.textContent = townFactors.lossStress;
  if (badgeEl) badgeEl.textContent = seasonLabel;
  if (yardLevelEl) yardLevelEl.textContent = tierInfo.title;
  if (topActionEl) topActionEl.textContent = townFactors.topAction;

  if (tipEl) {
    tipEl.innerHTML = `💡 <strong>Citizen Science Insight for ${town}:</strong> With migration activity at <strong>${calculatedPercentage}%</strong>, your yard operates at <strong>${tierInfo.title}</strong>. Today's top action in ${town} is to <strong>${townFactors.topAction}</strong>.`;
  }
}

// Secure Login Handler
function handleLoginSubmit(event) {
  if (event) event.preventDefault();
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  if (!usernameInput || !passwordInput) return;

  const username = usernameInput.value.trim();
  const pass = passwordInput.value;

  if (!username || !pass) {
    alert("Please enter both a username and password.");
    return;
  }

  let registeredUsers = JSON.parse(localStorage.getItem("orniflora_users") || "[]");
  const storedPass = localStorage.getItem(`orniflora_pass_${username}`);

  // If user does not exist or password doesn't match
  if (!registeredUsers.includes(username) || !storedPass || storedPass !== pass) {
    alert("Incorrect username or password. Please check your credentials or switch to Sign Up to create a new account.");
    return;
  }

  sessionStorage.setItem("current_logged_user", username);
  window.location.href = "dashboard.html";
}

// Secure Signup Handler
function handleSignupSubmit(event) {
  if (event) event.preventDefault();
  const usernameInput = document.getElementById("signup-username");
  const passwordInput = document.getElementById("signup-password");
  const countySelect = document.getElementById("countySelect");
  const citySelect = document.getElementById("citySelect");

  if (!usernameInput || !passwordInput) return;

  const username = usernameInput.value.trim();
  const pass = passwordInput.value;
  const county = countySelect && countySelect.value ? countySelect.value : "Wake";
  const city = citySelect && citySelect.value ? citySelect.value : "Holly Springs";

  if (!username || !pass) {
    alert("Please fill in both a username and password.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("orniflora_users") || "[]");

  if (users.includes(username)) {
    alert("This username is already registered! Please log in or choose a different handle.");
    return;
  }

  users.push(username);
  localStorage.setItem("orniflora_users", JSON.stringify(users));
  localStorage.setItem(`orniflora_pass_${username}`, pass);
  localStorage.setItem(`orniflora_location_${username}`, `${city}, ${county} Co.`);
  
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  localStorage.setItem(`orniflora_created_${username}`, today);

  sessionStorage.setItem("current_logged_user", username);
  window.location.href = "dashboard.html";
}

function toggleProfileMenu(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("profile-dropdown");
  if (dropdown) dropdown.classList.toggle("show");
}

document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("profile-dropdown");
  if (dropdown && dropdown.classList.contains("show")) {
    const profileBtn = document.querySelector(".profile-btn");
    if (!profileBtn || !profileBtn.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  }
});

function renderTasksPage() {
  const tasksContainer = document.getElementById("tasks-list");
  if (!tasksContainer) return;

  const state = getUserState();
  const today = new Date().toISOString().split("T")[0];

  tasksContainer.innerHTML = AVAILABLE_TASKS.map(task => {
    const taskLastDone = localStorage.getItem(`orniflora_task_${task.id}_lastDate_${state.loggedUser}`);
    const isCompletedToday = (taskLastDone === today);

    return `
      <div class="task-card ${isCompletedToday ? 'completed-card' : ''}">
        <div class="task-info">
          <h4>${task.title} <span class="task-badge">+${task.pts} Pts</span></h4>
          <p>${task.desc}</p>
          ${isCompletedToday ? '<span class="status-done">✅ Completed Today</span>' : ''}
        </div>
        <button 
          onclick="triggerTaskVerification('${task.id}', '${task.title}', ${task.pts})" 
          class="btn-task" 
          ${isCompletedToday ? 'disabled' : ''}>
          ${isCompletedToday ? 'Logged Today' : 'Log Action'}
        </button>
      </div>
    `;
  }).join("");
}

let activeTaskId = null;
let activeTaskTitle = "";
let activeTaskPts = 0;
let uploadedPhotoData = "";

function triggerTaskVerification(taskId, taskTitle, pts) {
  const state = getUserState();
  const today = new Date().toISOString().split("T")[0];
  const taskLastDone = localStorage.getItem(`orniflora_task_${taskId}_lastDate_${state.loggedUser}`);

  if (taskLastDone === today) {
    alert("You have already logged this activity today!");
    return;
  }

  activeTaskId = taskId;
  activeTaskTitle = taskTitle;
  activeTaskPts = pts;
  uploadedPhotoData = "";

  const titleModal = document.getElementById("modal-task-title");
  if (titleModal) titleModal.textContent = `Log: ${taskTitle}`;
  const noteInput = document.getElementById("proof-note");
  if (noteInput) noteInput.value = "";
  const imgPrev = document.getElementById("image-preview");
  if (imgPrev) imgPrev.style.display = "none";
  const photoInput = document.getElementById("photo-input");
  if (photoInput) photoInput.value = "";
  const verifyBtn = document.getElementById("verify-btn");
  if (verifyBtn) verifyBtn.disabled = true;

  const modal = document.getElementById("ai-modal");
  if (modal) modal.style.display = "flex";
}

function previewUserImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedPhotoData = e.target.result;
      const img = document.getElementById("image-preview");
      if (img) {
        img.src = uploadedPhotoData;
        img.style.display = "block";
      }
      const verifyBtn = document.getElementById("verify-btn");
      if (verifyBtn) verifyBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }
}

function submitTaskProof() {
  const noteInput = document.getElementById("proof-note");
  const noteText = noteInput ? noteInput.value.trim() : "";

  if (!noteText) {
    alert("Please enter a quick field note describing your activity.");
    return;
  }

  const state = getUserState();
  const today = new Date().toISOString().split("T")[0];

  localStorage.setItem(`orniflora_task_${activeTaskId}_lastDate_${state.loggedUser}`, today);
  saveUserScore(activeTaskPts, `${activeTaskTitle} ("${noteText}")`);
  
  alert(`🎉 Success! +${activeTaskPts} Pts added to your Oasis Score.`);
  closeAIModal();
  renderTasksPage();
}

function closeAIModal() {
  const modal = document.getElementById("ai-modal");
  if (modal) modal.style.display = "none";
}

function renderLeaderboard() {
  const leaderboardContainer = document.getElementById("leaderboard-list");
  if (!leaderboardContainer) return;

  const state = getUserState();
  let registeredUsers = JSON.parse(localStorage.getItem("orniflora_users") || "[]");
  
  if (state.loggedUser && !registeredUsers.includes(state.loggedUser)) {
    registeredUsers.push(state.loggedUser);
    localStorage.setItem("orniflora_users", JSON.stringify(registeredUsers));
  }

  let userList = registeredUsers.map(username => {
    const uPoints = parseInt(localStorage.getItem(`orniflora_points_${username}`) || "0");
    const uStreak = parseInt(localStorage.getItem(`orniflora_streak_${username}`) || "0");
    const uTier = getRefugeTierInfo(uPoints);
    return { name: username, score: uPoints, streak: uStreak, tier: uTier };
  });

  if (userList.length < 3) {
    userList.push({ name: "EcoTracker99", score: 850, streak: 18, tier: getRefugeTierInfo(850) });
    userList.push({ name: "NC_BirdWatcher", score: 420, streak: 9, tier: getRefugeTierInfo(420) });
  }

  userList.sort((a, b) => b.score - a.score);

  leaderboardContainer.innerHTML = userList.map((user, idx) => `
    <div class="leaderboard-row ${user.name === state.loggedUser ? 'highlight-user' : ''}">
      <div class="user-meta">
        <span class="rank-num">#${idx + 1}</span>
        <div>
          <strong class="user-name">${user.name}</strong>
          <div class="tier-pill-badge ${user.tier.badgeClass}">${user.tier.title}</div>
        </div>
      </div>
      <div class="user-score-info">
        <span class="score-num">${user.score} pts</span>
        <span class="streak-count">🔥 ${user.streak}d streak</span>
      </div>
    </div>
  `).join("");
}

function renderAccountPage() {
  const state = getUserState();
  const usernameEl = document.getElementById("account-username");
  const createdEl = document.getElementById("account-created");
  const locationEl = document.getElementById("account-location");
  const pointsEl = document.getElementById("account-points");
  const streakEl = document.getElementById("account-streak");
  const historyListEl = document.getElementById("account-history-list");

  if (usernameEl) usernameEl.textContent = state.loggedUser;
  if (createdEl) createdEl.textContent = localStorage.getItem(state.createdKey) || "Today";
  if (locationEl) locationEl.textContent = localStorage.getItem(state.locationKey) || "Holly Springs, Wake Co.";
  if (pointsEl) pointsEl.textContent = state.points;
  if (streakEl) streakEl.textContent = state.streak;

  if (historyListEl) {
    const history = JSON.parse(localStorage.getItem(state.historyKey) || "[]");
    if (history.length === 0) {
      historyListEl.innerHTML = `<li class="history-item empty">No logged tasks yet. Head over to Log Actions to earn points!</li>`;
    } else {
      historyListEl.innerHTML = history.slice().reverse().map(item => `
        <li class="history-item">
          <div>
            <strong>${item.action}</strong>
            <div class="time-tag">${item.date}</div>
          </div>
          <span class="history-pts">+${item.pts} Pts</span>
        </li>
      `).join("");
    }
  }
}

function saveUserScore(newPoints, actionTitle = "Earned Points") {
  const state = getUserState();
  let newTotalPoints = state.points + newPoints;
  let newStreak = state.streak;
  const today = new Date().toISOString().split("T")[0];

  if (state.lastLoggedDate !== today) {
    newStreak += 1;
    localStorage.setItem(state.dateKey, today);
    localStorage.setItem(state.streakKey, newStreak.toString());
  }

  const history = JSON.parse(localStorage.getItem(state.historyKey) || "[]");
  const formattedDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  history.push({ action: actionTitle, pts: newPoints, date: formattedDate });
  
  localStorage.setItem(state.historyKey, JSON.stringify(history));
  localStorage.setItem(state.pointsKey, newTotalPoints.toString());
  
  const pointsEl = document.getElementById("user-points");
  if (pointsEl) pointsEl.textContent = newTotalPoints;
}

function initPage(pageType = "dashboard") {
  const state = getUserState();
  const profileDisplay = document.getElementById("nav-username");
  const dashUserDisplay = document.getElementById("dashUser");
  const locationLabel = document.getElementById("user-location-label");

  if (profileDisplay) profileDisplay.textContent = state.loggedUser || "Guest";
  if (dashUserDisplay) dashUserDisplay.textContent = state.loggedUser || "Guest";

  const savedLoc = localStorage.getItem(state.locationKey) || "Holly Springs, Wake Co.";
  if (locationLabel) locationLabel.textContent = savedLoc;

  const pointsEl = document.getElementById("user-points");
  const streakEl = document.getElementById("user-streak");

  if (pointsEl) pointsEl.textContent = state.points;
  if (streakEl) streakEl.textContent = state.streak;

  if (pageType === "dashboard") {
    renderTownSpecies();
    renderDynamicSpotlight();
    renderBioCorridorIndex();
  } else if (pageType === "tasks") {
    renderTasksPage();
  } else if (pageType === "leaderboard") {
    renderLeaderboard();
  } else if (pageType === "account") {
    renderAccountPage();
  }
}

function logoutApp() {
  sessionStorage.removeItem("current_logged_user");
  window.location.href = "auth.html";
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuthGuard();
  const currentPage = document.body ? (document.body.dataset.page || "dashboard") : "dashboard";
  if (currentPage !== "auth") {
    initPage(currentPage);
  }
});