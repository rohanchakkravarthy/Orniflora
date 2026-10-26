// Function to safely check authentication status
function checkAuthGuard() {
  const loggedUser = sessionStorage.getItem("current_logged_user");
  const currentPage = document.body ? document.body.dataset.page : "";

  if (!loggedUser && currentPage !== "auth" && !window.location.pathname.endsWith("auth.html")) {
    window.location.href = "auth.html";
  }
}

// 7-Tier Level Progression Calculator
function getRefugeTierInfo(points) {
  if (points >= 2500) {
    return { level: 7, title: "Veteran Habitat", badgeClass: "tier-7" };
  } else if (points >= 1000) {
    return { level: 6, title: "Certified Sanctuary", badgeClass: "tier-6" };
  } else if (points >= 500) {
    return { level: 5, title: "Ginormous Garden", badgeClass: "tier-5" };
  } else if (points >= 750) {
    return { level: 4, title: "Microhabitat", badgeClass: "tier-4" };
  } else if (points >= 300) {
    return { level: 3, title: "Beginner Garden", badgeClass: "tier-3" };
  } else if (points >= 100) {
    return { level: 2, title: "Seedling Sanctuary", badgeClass: "tier-2" };
  } else {
    return { level: 1, title: "Baby Habitat", badgeClass: "tier-1" };
  }
}

// Comprehensive Ecosystem Database
const ECOSYSTEM_MATCHMAKER = {
  "Eastern Bluebird": {
    type: "bird",
    desc: "Eastern Bluebirds rely heavily on insects during summer breeding, foraging caterpillars off native leaves. In fall and winter, they switch to energy-rich native berries to survive freezing weather.",
    pairings: ["American Beautyberry", "Flowering Dogwood", "Spicebush"],
    tip: "Leave native berry bushes unpruned in winter to give bluebirds crucial cold-weather energy."
  },
  "Northern Cardinal": {
    type: "bird",
    desc: "Year-round NC residents, Northern Cardinals feed on large native seeds and nest in dense thickets that shield nestlings from urban predators.",
    pairings: ["Purple Coneflower", "Black-eyed Susan", "Spicebush"],
    tip: "Keep dried coneflower seed heads intact through winter for cardinals to feed on."
  },
  "Carolina Chickadee": {
    type: "bird",
    desc: "Chickadees require up to 9,000 caterpillars to raise a single clutch of eggs, foraging caterpillar larvae hosted on native foliage.",
    pairings: ["Butterfly Weed", "Spicebush", "Flowering Dogwood"],
    tip: "Avoid garden pesticides because chickadees depend on leaf caterpillars to feed their chicks."
  },
  "Ruby-throated Hummingbird": {
    type: "bird",
    desc: "A tiny migratory nectar feeder, the Ruby-throated Hummingbird fuels its trans-Gulf flight by visiting native tubular flowers rich in natural nectar.",
    pairings: ["Trumpet Honeysuckle", "Cardinal Flower", "Coral Honeysuckle"],
    tip: "Plant bright red native tubular flowers to attract hummingbirds naturally without sugar-water feeders."
  },
  "Pine Warbler": {
    type: "bird",
    desc: "Pine-obligate songbirds that nest high in evergreen canopies across central NC. They glean insects off pine needles and feed on native pine cone seeds.",
    pairings: ["Loblolly Pine", "Longleaf Pine", "Crossvine"],
    tip: "Preserving mature pine stands in backyards creates vital shelter for migrating Pine Warblers."
  },
  "American Robin": {
    type: "bird",
    desc: "Robins search damp soil for worms during spring and turn to high-fat native fruits in autumn to store energy for migration.",
    pairings: ["American Beautyberry", "Elderberry", "Flowering Dogwood"],
    tip: "Maintain a small leaf-litter zone in your yard so robins can forage for soil invertebrates."
  },
  "Tufted Titmouse": {
    type: "bird",
    desc: "Acorn and seed hoarders, Titmice pluck seeds from native plants and cache them under tree bark for winter reserves.",
    pairings: ["Purple Coneflower", "Black-eyed Susan", "Loblolly Pine"],
    tip: "Setting up a native seed feeder alongside coneflowers creates an active foraging station."
  },
  "Red-headed Woodpecker": {
    type: "bird",
    desc: "Striking cavity nesters that thrive in oak savanna habitats, storing pine nuts and acorns in dead snag trees.",
    pairings: ["Loblolly Pine", "Longleaf Pine", "American Beautyberry"],
    tip: "Leave safe dead tree trunks standing to provide nesting cavities for woodpeckers."
  },
  "Carolina Wren": {
    type: "bird",
    desc: "Energetic insectivores that hunt for spiders and beetles hidden inside thick native vines and brush piles.",
    pairings: ["Crossvine", "Trumpet Honeysuckle", "American Beautyberry"],
    tip: "Build a small wood or brush pile in a quiet corner of your garden to offer wren habitat."
  },
  "Brown-headed Nuthatch": {
    type: "bird",
    desc: "Specialized NC pine-savanna birds known for using pine needles as tools to pry open tree bark for insects.",
    pairings: ["Longleaf Pine", "Wiregrass", "Loblolly Pine"],
    tip: "Retaining native longleaf and loblolly pines helps protect this declining local species."
  },
  "Summer Tanager": {
    type: "bird",
    desc: "Bee and wasp specialists, Summer Tanagers nest in open pine-oak canopies and pluck stinging insects right out of the air near native flowers.",
    pairings: ["Wild Indigo", "Trumpet Honeysuckle", "Longleaf Pine"],
    tip: "Native flowering meadows attract beneficial pollinators that Summer Tanagers feed on."
  },
  "Eastern Towhee": {
    type: "bird",
    desc: "Ground-dwelling birds that scratch through fallen native leaf litter to uncover beetles, spiders, and seeds.",
    pairings: ["Wiregrass", "Wild Indigo", "Black-eyed Susan"],
    tip: "Leave autumn leaves under garden shrubs instead of bagging them to create towhee habitat."
  },
  "Barred Owl": {
    type: "bird",
    desc: "Nocturnal predators that nest in mature hollow hardwoods along swampy river basins like the Neuse and Cape Fear rivers.",
    pairings: ["Loblolly Pine", "Flowering Dogwood", "Buttonbush"],
    tip: "Protecting mature trees along stream corridors ensures owls have safe daytime roosting spots."
  },
  "Wood Thrush": {
    type: "bird",
    desc: "Known for their flute-like song, Wood Thrushes forage in shady leaf litter under damp forest understories for snails and insects.",
    pairings: ["Mapleleaf Viburnum", "Sweet Goldenrod", "Spicebush"],
    tip: "Planting layered native shrubs creates cool, moist understory shade essential for thrushes."
  },
  "Yellow-billed Cuckoo": {
    type: "bird",
    desc: "Caterpillar specialists that consume spiny caterpillars that other birds avoid, nesting in dense canopy foliage.",
    pairings: ["Mapleleaf Viburnum", "Heartleaf Aster", "Flowering Dogwood"],
    tip: "Planting native viburnums provides dense nesting cover and caterpillar prey."
  },
  "Whip-poor-will": {
    type: "bird",
    desc: "Nocturnal aerial insectivores that nest directly on dry forest leaf litter and hunt moths over open night meadows.",
    pairings: ["Elderberry", "Buttonbush", "Joe-Pye Weed"],
    tip: "Reducing outdoor night lighting helps preserve night-flying moths that Whip-poor-wills eat."
  },
  "Swainson's Warbler": {
    type: "bird",
    desc: "Secretive swamp-dwelling warblers that use their strong bills to flip over damp leaf litter, hunting spiders and insect larvae in dense bottomland thickets.",
    pairings: ["Switchcane", "Sweetgum", "Fothergilla"],
    tip: "Preserving undisturbed damp woodlands and thick bottomland undergrowth protects Swainson's Warbler habitat."
  },
  "Hooded Warbler": {
    type: "bird",
    desc: "Active canopy-edge gleaners that dart among dense shrub layers to capture flying insects near forest openings.",
    pairings: ["Mapleleaf Viburnum", "Spicebush", "Flowering Dogwood"],
    tip: "Maintaining diverse forest understories supports successful warbler breeding seasons."
  },
  "Red-tailed Hawk": {
    type: "bird",
    desc: "Majestic raptors soaring over open fields and highways, perching on tall snags to spot small mammals.",
    pairings: ["Loblolly Pine", "Longleaf Pine", "Flowering Dogwood"],
    tip: "Avoiding rodenticides keeps local hawks safe from secondary poisoning."
  },
  "Blue-gray Gnatcatcher": {
    type: "bird",
    desc: "Tiny, restless insect hunters that weave delicate spiderweb nests in hardwood trees and glean tiny aphids off leaves.",
    pairings: ["Flowering Dogwood", "Sweet Goldenrod", "Mapleleaf Viburnum"],
    tip: "Providing pesticide-free gardens ensures gnatcatchers have plenty of small insects to eat."
  },
  "Great Blue Heron": {
    type: "bird",
    desc: "Patient wetland waders that stalk fish and amphibians along the edges of rivers, lakes, and reservoirs.",
    pairings: ["Buttonbush", "Elderberry", "Swamp Rosemallow"],
    tip: "Protecting natural shoreline vegetation preserves critical foraging zones for herons."
  },
  "Wood Duck": {
    type: "bird",
    desc: "Perched tree-ducks that nest in hollow cavities over water, feeding on acorns, seeds, and aquatic plants.",
    pairings: ["Buttonbush", "Elderberry", "Loblolly Pine"],
    tip: "Installing wooden nest boxes near ponds helps boost local Wood Duck populations."
  },
  "Belted Kingfisher": {
    type: "bird",
    desc: "Rattling coastal-plain birds that dive headfirst into streams and lakes to catch small fish from streamside perches.",
    pairings: ["Buttonbush", "Elderberry", "Loblolly Pine"],
    tip: "Keeping stream banks natural and un-channeled prevents erosion and supports fish populations."
  },
  "Cedar Waxwing": {
    type: "bird",
    desc: "Sociable fruit-eating nomads that travel in flocks, feeding heavily on late-season berries in native trees and shrubs.",
    pairings: ["American Beautyberry", "Flowering Dogwood", "Elderberry"],
    tip: "Planting native fruit trees ensures winter flocks have plenty of natural food sources."
  },
  "Northern Bobwhite": {
    type: "bird",
    desc: "Ground-dwelling quail known for their iconic whistle, foraging for weed seeds and insects in grassy fields.",
    pairings: ["Wiregrass", "Wild Indigo", "Black-eyed Susan"],
    tip: "Creating wild field borders with native bunchgrasses gives quail vital nesting cover."
  },
  "American Beautyberry": {
    type: "plant",
    desc: "Produces vibrant purple autumn berries packed with moisture and nutrients, serving as a critical energy stopover for migrating songbirds.",
    pairings: ["Eastern Bluebird", "American Robin", "Northern Cardinal"],
    tip: "Plant Beautyberry near sunny borders to create an autumn bird feeding station."
  },
  "Purple Coneflower": {
    type: "plant",
    desc: "A durable native flower. Bees and butterflies visit summer blooms, while finches and cardinals strip seed heads through winter.",
    pairings: ["Northern Cardinal", "Tufted Titmouse", "Carolina Chickadee"],
    tip: "Do not cut down dead flower stalks in fall—the seed heads feed birds through snow."
  },
  "Trumpet Honeysuckle": {
    type: "plant",
    desc: "A non-invasive native vine featuring tubular red flowers specially shaped for hummingbird beaks to collect natural nectar.",
    pairings: ["Ruby-throated Hummingbird", "Carolina Wren", "Summer Tanager"],
    tip: "Train this vine up a sunny fence or trellis near a window for clear bird watching."
  },
  "Butterfly Weed": {
    type: "plant",
    desc: "Essential host plant for caterpillars that parent songbirds collect to feed nestlings, plus rich nectar for adult pollinators.",
    pairings: ["Carolina Chickadee", "Eastern Bluebird", "Ruby-throated Hummingbird"],
    tip: "Plant in full sun and well-drained soil to build a caterpillar nursery."
  },
  "Black-eyed Susan": {
    type: "plant",
    desc: "Durable native wildflowers providing abundant summer nectar and dense autumn seed clusters for seed-eating birds.",
    pairings: ["Northern Cardinal", "Tufted Titmouse", "Eastern Towhee"],
    tip: "Allow plants to naturally drop seed to form expanding native meadow patches."
  },
  "Spicebush": {
    type: "plant",
    desc: "Understory shrub supporting swallowtail caterpillars in summer and producing high-fat red berries for migrating thrushes in fall.",
    pairings: ["Eastern Bluebird", "Carolina Chickadee", "Wood Thrush"],
    tip: "Thrives in partial shade—perfect for planting along wooded fence lines."
  },
  "Flowering Dogwood": {
    type: "plant",
    desc: "North Carolina's state tree. High-calcium spring blooms support insects, while glossy red fall berries feed over 35 songbird species.",
    pairings: ["Eastern Bluebird", "American Robin", "Yellow-billed Cuckoo"],
    tip: "Plant under larger canopy trees to mimic its natural forest understory position."
  },
  "Cardinal Flower": {
    type: "plant",
    desc: "Brilliant scarlet spikes produce rich nectar, making it a favorite feeding stop for southward-migrating hummingbirds in late summer.",
    pairings: ["Ruby-throated Hummingbird", "Summer Tanager", "Carolina Wren"],
    tip: "Requires moist soil—ideal for planting near birdbaths or rain gardens."
  },
  "Loblolly Pine": {
    type: "plant",
    desc: "Keystone evergreen tree offering crucial winter wind shelter, roosting sites, and pine cone seeds for native birds.",
    pairings: ["Pine Warbler", "Brown-headed Nuthatch", "Barred Owl"],
    tip: "Maintain pine needle mulch under trees to create natural foraging ground cover."
  },
  "Longleaf Pine": {
    type: "plant",
    desc: "Historic NC pine species supporting rare nuthatches and woodpeckers with nest cavities and giant seed cones.",
    pairings: ["Brown-headed Nuthatch", "Red-headed Woodpecker", "Summer Tanager"],
    tip: "Longleaf pines live for centuries and form the backbone of central NC pine ecosystems."
  },
  "Crossvine": {
    type: "plant",
    desc: "Early spring bloomer offering orange-red trumpet flowers that feed returning hummingbirds before other flowers open.",
    pairings: ["Ruby-throated Hummingbird", "Carolina Wren", "Pine Warbler"],
    tip: "Provides thick evergreen foliage that gives wrens winter shelter."
  },
  "Wiregrass": {
    type: "plant",
    desc: "Native bunchgrass providing protective ground shelter and insect foraging zones for ground-feeding songbirds.",
    pairings: ["Eastern Towhee", "Brown-headed Nuthatch", "Northern Bobwhite"],
    tip: "Plant in dry, sunny areas to create natural ground-cover protection."
  },
  "Wild Indigo": {
    type: "plant",
    desc: "Deep-rooted native perennial supporting native caterpillars and bumblebees, generating seed pods for songbirds.",
    pairings: ["Summer Tanager", "Eastern Towhee", "Carolina Chickadee"],
    tip: "Once established, Wild Indigo is drought-hardy and blooms year after year."
  },
  "Elderberry": {
    type: "plant",
    desc: "Fast-growing shrub producing massive clusters of dark berries in late summer, providing a feast for fruit-eating songbirds.",
    pairings: ["American Robin", "Whip-poor-will", "Cedar Waxwing"],
    tip: "Elderberries love moist ground—great for natural wetland borders."
  },
  "Buttonbush": {
    type: "plant",
    desc: "Moisture-loving shrub with globe-like flowers attracting butterflies and water birds along creek edges.",
    pairings: ["Great Blue Heron", "Wood Duck", "Whip-poor-will"],
    tip: "Plant along pond edges or low spots that hold water after rain."
  },
  "Mapleleaf Viburnum": {
    type: "plant",
    desc: "Shade-tolerant forest shrub providing caterpillar habitat and dark purple berries for deep-forest thrushes.",
    pairings: ["Wood Thrush", "Yellow-billed Cuckoo", "Eastern Towhee"],
    tip: "Excellent native choice for shaded backyards with heavy tree canopy."
  },
  "Heartleaf Aster": {
    type: "plant",
    desc: "Delicate woodland aster providing late-season nectar for migrating pollinators and seeds for small birds.",
    pairings: ["Yellow-billed Cuckoo", "Wood Thrush", "Carolina Chickadee"],
    tip: "Tolerates deep shade, making it a reliable woodland garden addition."
  },
  "Calico Aster": {
    type: "plant",
    desc: "Abundant white blooms that supply essential late-autumn nectar before winter freezes.",
    pairings: ["Yellow-billed Cuckoo", "Eastern Towhee", "Northern Cardinal"],
    tip: "Grows easily in borders and attracts beneficial native pollinators."
  },
  "Orange Coneflower": {
    type: "plant",
    desc: "Golden petals and dark central cones supplying rich summer nectar and nutritious winter seeds.",
    pairings: ["Northern Cardinal", "American Goldfinch", "Tufted Titmouse"],
    tip: "Extremely drought-resistant once established in garden beds."
  },
  "Tall Blue Wild Indigo": {
    type: "plant",
    desc: "Stately perennial legume fixing soil nitrogen while hosting specialized insect larvae for birds.",
    pairings: ["Summer Tanager", "Carolina Chickadee", "Eastern Bluebird"],
    tip: "Features striking blue foliage and seed pods that rattle in autumn breeze."
  },
  "Wild Strawberry": {
    type: "plant",
    desc: "Low-growing ground cover producing sweet berries relished by ground-foraging birds.",
    pairings: ["Wood Thrush", "Eastern Towhee", "American Robin"],
    tip: "Makes a simple ground replacement in shady spots."
  },
  "Sweet Goldenrod": {
    type: "plant",
    desc: "Golden autumn spikes that support scores of native insect species vital for migrating songbirds.",
    pairings: ["Wood Thrush", "Blue-gray Gnatcatcher", "Carolina Wren"],
    tip: "Anise-scented leaves can be brewed into a traditional herbal tea."
  },
  "Swamp Rosemallow": {
    type: "plant",
    desc: "Native hibiscus with large blooms providing sanctuary for wetland insects and birds.",
    pairings: ["Great Blue Heron", "Swamp Sparrow", "Red-winged Blackbird"],
    tip: "Plant in rain gardens or wet drainage areas for late summer color."
  },
  "New Jersey Tea": {
    type: "plant",
    desc: "Compact deciduous shrub with white flower clusters that attract diverse insect pollinators.",
    pairings: ["Carolina Chickadee", "Eastern Bluebird", "Northern Cardinal"],
    tip: "Deep taproots make it remarkably resistant to summer dry spells."
  },
  "Bluestem Goldenrod": {
    type: "plant",
    desc: "Golden blossoms along arching stems, offering late-season sustenance for local wildlife.",
    pairings: ["Wood Thrush", "Carolina Wren", "Pine Warbler"],
    tip: "Thrives effortlessly in wooded shade gardens and natural borders."
  },
  "Passionflower": {
    type: "plant",
    desc: "Native vine producing intricate blooms and nutritious autumn fruit for wildlife.",
    pairings: ["Summer Tanager", "Carolina Wren", "Northern Cardinal"],
    tip: "Train along fences to provide dense shelter and flowers simultaneously."
  },
  "Wax Myrtle": {
    type: "plant",
    desc: "Aromatic evergreen shrub producing waxy berries eagerly consumed by tree swallows and warblers.",
    pairings: ["Pine Warbler", "Yellow-rumped Warbler", "Eastern Bluebird"],
    tip: "Acts as a privacy screen that doubles as shelter for birds."
  },
  "Wild Geranium": {
    type: "plant",
    desc: "Pink spring wildflower providing early nectar for emerging pollinators.",
    pairings: ["Carolina Chickadee", "Wood Thrush", "Blue-gray Gnatcatcher"],
    tip: "Forms small green mats under shade trees in spring."
  },
  "Narrowleaf Sundrops": {
    type: "plant",
    desc: "Bright yellow evening-primrose relative opening cups that attract daytime insects.",
    pairings: ["Eastern Bluebird", "Northern Cardinal", "Indigo Bunting"],
    tip: "Prefers sunny meadows and open woodland borders."
  },
  "Coral Honeysuckle": {
    type: "plant",
    desc: "Climbing native vine with coral-red trumpet flowers that bloom all summer for hummingbirds.",
    pairings: ["Ruby-throated Hummingbird", "Carolina Wren", "American Robin"],
    tip: "Unlike invasive Japanese honeysuckle, this native variety grows neatly in domestic gardens."
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

// Real-World Municipal & Ecological Dataset
const TOWN_REAL_DATA = {
  // Caswell County
  "Milton": { popDensity: 150, imperviousPct: 6, canopyPct: 80, migIndex: 64 },
  "Yanceyville": { popDensity: 240, imperviousPct: 10, canopyPct: 77, migIndex: 67 },

  // Franklin County
  "Bunn": { popDensity: 210, imperviousPct: 9, canopyPct: 76, migIndex: 68 },
  "Franklinton": { popDensity: 920, imperviousPct: 29, canopyPct: 64, migIndex: 75 },
  "Louisburg": { popDensity: 780, imperviousPct: 25, canopyPct: 66, migIndex: 72 },

  // Granville County
  "Butner": { popDensity: 820, imperviousPct: 30, canopyPct: 63, migIndex: 73 },
  "Creedmoor": { popDensity: 1100, imperviousPct: 34, canopyPct: 60, migIndex: 75 },
  "Oxford": { popDensity: 950, imperviousPct: 28, canopyPct: 65, migIndex: 71 },
  "Stovall": { popDensity: 180, imperviousPct: 8, canopyPct: 78, migIndex: 65 },

  // Harnett County
  "Angier": { popDensity: 1120, imperviousPct: 33, canopyPct: 56, migIndex: 77 },
  "Dunn": { popDensity: 1350, imperviousPct: 38, canopyPct: 51, migIndex: 75 },
  "Lillington": { popDensity: 690, imperviousPct: 22, canopyPct: 63, migIndex: 74 },

  // Johnston County
  "Benson": { popDensity: 740, imperviousPct: 24, canopyPct: 61, migIndex: 72 },
  "Clayton": { popDensity: 1540, imperviousPct: 44, canopyPct: 52, migIndex: 82 },
  "Selma": { popDensity: 980, imperviousPct: 31, canopyPct: 58, migIndex: 74 },
  "Smithfield": { popDensity: 1210, imperviousPct: 37, canopyPct: 55, migIndex: 76 },

  // Lee County
  "Broadway": { popDensity: 310, imperviousPct: 12, canopyPct: 72, migIndex: 69 },
  "Sanford": { popDensity: 1420, imperviousPct: 39, canopyPct: 57, migIndex: 78 },

  // Person County
  "Roxboro": { popDensity: 890, imperviousPct: 26, canopyPct: 68, migIndex: 70 },

  // Wake County
  "Apex": { popDensity: 1950, imperviousPct: 42, canopyPct: 55, migIndex: 83 },
  "Cary": { popDensity: 2600, imperviousPct: 46, canopyPct: 58, migIndex: 85 },
  "Fuquay-Varina": { popDensity: 1450, imperviousPct: 35, canopyPct: 54, migIndex: 79 },
  "Garner": { popDensity: 1780, imperviousPct: 41, canopyPct: 50, migIndex: 82 },
  "Holly Springs": { popDensity: 1620, imperviousPct: 38, canopyPct: 56, migIndex: 81 },
  "Knightdale": { popDensity: 1320, imperviousPct: 36, canopyPct: 57, migIndex: 79 },
  "Morrisville": { popDensity: 2850, imperviousPct: 52, canopyPct: 48, migIndex: 84 },
  "Raleigh": { popDensity: 3150, imperviousPct: 58, canopyPct: 53, migIndex: 88 },
  "Wake Forest": { popDensity: 1890, imperviousPct: 40, canopyPct: 55, migIndex: 83 },
  "Zebulon": { popDensity: 650, imperviousPct: 22, canopyPct: 62, migIndex: 74 },
};

const AVAILABLE_TASKS = [
  { id: "birdbath", title: "Clean or Refill a Birdbath", pts: 25, desc: "Provide clean water for resident songbirds." },
  { id: "feeder", title: "Maintain a Bird Feeder", pts: 30, desc: "Fill feeders with native seed or suet." },
  { id: "plant_native", title: "Plant a Native Species", pts: 50, desc: "Add native flora suited to your regional climate." },
  { id: "water_plant", title: "Water Native Gardens", pts: 15, desc: "Maintain garden areas during dry summer weather." },
  { id: "remove_invasive", title: "Remove Invasive Vegetation", pts: 40, desc: "Clear non-native weeds to allow native plants to grow." }
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
    desc: `${speciesName} plays a role in supporting local species diversity in North Carolina.`,
    pairings: ["Eastern Bluebird", "Northern Cardinal", "Carolina Chickadee"],
    tip: "Plant native species in groups to maximize shelter and food."
  };

  if (titleEl) titleEl.textContent = speciesName;
  if (descEl) descEl.textContent = data.desc;

  if (chipEl) {
    if (data.type === "bird") {
      chipEl.textContent = "Native Bird Species";
      chipEl.className = "modal-category-chip chip-bird";
      if (pairingsHeading) pairingsHeading.textContent = "Supported Plants";
    } else {
      chipEl.textContent = "Native Plant Species";
      chipEl.className = "modal-category-chip chip-plant";
      if (pairingsHeading) pairingsHeading.textContent = "Attracted Birds";
    }
  }

  if (pairingsList) {
    pairingsList.innerHTML = data.pairings.map(item => `
      <span class="pairing-chip">${item}</span>
    `).join("");
  }

  if (tipEl) {
    tipEl.innerHTML = `<strong>Yard Action:</strong> ${data.tip}`;
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
}

function renderBioCorridorIndex() {
  const titleEl = document.getElementById("flyway-title");
  const densityEl = document.getElementById("flyway-density");
  const yardLevelEl = document.getElementById("yard-refuge-level");
  const stressEl = document.getElementById("corridor-stress");
  const fillEl = document.getElementById("meter-fill");
  const topActionEl = document.getElementById("top-recommended-action");

  if (!densityEl) return;

  const state = getUserState();
  const { town } = getUserLocationInfo(state.loggedUser);
  const points = state.points;
  const currentMonth = new Date().getMonth();

  // Fetch real-world municipal parameters or fallback to default
  const townData = TOWN_REAL_DATA[town] || { popDensity: 1000, imperviousPct: 30, canopyPct: 60, migIndex: 75 };

  // 1. Calculate Dynamic Stress Score
  const stressScore = (0.6 * townData.imperviousPct) + (0.4 * Math.min(100, townData.popDensity / 40));
  let lossStressLabel = "Moderate Need";
  if (stressScore >= 75) lossStressLabel = "Critical Need";
  else if (stressScore >= 50) lossStressLabel = "High Need";
  else if (stressScore >= 25) lossStressLabel = "Moderate Need";
  else lossStressLabel = "Low Need";

  // 2. Calculate Dynamic Migration Intensity %
  const isPeakMigration = [2, 3, 4, 6, 7, 8, 9].includes(currentMonth);
  let seasonalMultiplier = isPeakMigration ? 1.08 : 0.85;
  let seasonLabel = isPeakMigration ? "Peak Migration Period" : "Off-Peak Season";
  let canopyFactor = townData.canopyPct / 55; // Normalized baseline
  let calculatedPercentage = Math.min(98, Math.round(townData.migIndex * canopyFactor * seasonalMultiplier * 0.9));

  // 3. Determine Dynamic Recommended Activity
  let recommendedAction = "Fill Seed Feeder";
  if (townData.imperviousPct >= 40) {
    recommendedAction = "Clean Water Source";
  } else if (townData.canopyPct < 55) {
    recommendedAction = "Plant Native Species";
  } else if (townData.popDensity < 300) {
    recommendedAction = "Protect Native Berry Shrubs";
  } else {
    recommendedAction = "Retain Seed Heads";
  }

  const tierInfo = getRefugeTierInfo(points);

  // Render metrics to DOM
  if (titleEl) titleEl.textContent = `${town} Migration Status`;
  if (densityEl) densityEl.textContent = `${seasonLabel} (${calculatedPercentage}%)`;
  if (fillEl) fillEl.style.width = `${calculatedPercentage}%`;
  if (stressEl) stressEl.textContent = lossStressLabel;
  if (yardLevelEl) yardLevelEl.textContent = tierInfo.title;
  if (topActionEl) topActionEl.textContent = recommendedAction;
}

// Unified Login Handler
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

  const accounts = JSON.parse(localStorage.getItem("orniflora_accounts") || "{}");
  const fallbackPass = localStorage.getItem(`orniflora_pass_${username}`);

  const isValidAccount = (accounts[username] && accounts[username].password === pass) || (fallbackPass === pass);

  if (!isValidAccount) {
    alert("Incorrect username or password.");
    return;
  }

  sessionStorage.setItem("current_logged_user", username);
  window.location.href = "dashboard.html";
}

function handleSignupSubmit(event) {
  if (event) event.preventDefault();
  const usernameInput = document.getElementById("signup-username");
  const passwordInput = document.getElementById("signup-password");
  const confirmPasswordInput = document.getElementById("signup-confirm-password");
  const countySelect = document.getElementById("countySelect");
  const citySelect = document.getElementById("citySelect");

  if (!usernameInput || !passwordInput) return;

  const username = usernameInput.value.trim();
  const pass = passwordInput.value;
  const confirmPass = confirmPasswordInput ? confirmPasswordInput.value : pass;
  const county = countySelect && countySelect.value ? countySelect.value : "Wake";
  const city = citySelect && citySelect.value ? citySelect.value : "Holly Springs";

  if (!username || !pass) {
    alert("Please fill in all required fields.");
    return;
  }

  if (pass !== confirmPass) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  let accounts = JSON.parse(localStorage.getItem("orniflora_accounts") || "{}");

  if (accounts[username]) {
    alert("This username is already taken on this browser. Please select another.");
    return;
  }

  accounts[username] = { password: pass };
  localStorage.setItem("orniflora_accounts", JSON.stringify(accounts));

  let users = JSON.parse(localStorage.getItem("orniflora_users") || "[]");
  if (!users.includes(username)) {
    users.push(username);
    localStorage.setItem("orniflora_users", JSON.stringify(users));
  }

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
          ${isCompletedToday ? '<span class="status-done">Completed Today</span>' : ''}
        </div>
        <button 
          onclick="triggerTaskVerification('${task.id}', '${task.title}', ${task.pts})" 
          class="btn-task" 
          ${isCompletedToday ? 'disabled' : ''}>
          ${isCompletedToday ? 'Logged Today' : 'Record Activity'}
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
    alert("You have already logged this activity today.");
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
  const fileNameDisplay = document.getElementById("file-name-display");
  if (fileNameDisplay) fileNameDisplay.textContent = "No file chosen";

  const modal = document.getElementById("ai-modal");
  if (modal) modal.style.display = "flex";
}

function previewUserImage(event) {
  const file = event.target.files[0];
  if (file) {
    const fileNameDisplay = document.getElementById("file-name-display");
    if (fileNameDisplay) fileNameDisplay.textContent = file.name;

    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedPhotoData = e.target.result;
      const img = document.getElementById("image-preview");
      if (img) {
        img.src = uploadedPhotoData;
        img.style.display = "block";
      }
    };
    reader.readAsDataURL(file);
  }
}

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
          ${isCompletedToday ? '<span class="status-done">Completed Today</span>' : ''}
        </div>
        <button 
          onclick="triggerTaskVerification('${task.id}', '${task.title}', ${task.pts})" 
          class="btn-task" 
          ${isCompletedToday ? 'disabled' : ''}>
          ${isCompletedToday ? 'Logged Today' : 'Record Activity'}
        </button>
      </div>
    `;
  }).join("");
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

  if (userList.length === 0) {
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
        <span class="streak-count">${user.streak}d streak</span>
      </div>
    </div>
  `).join("");
}

function renderAccountPage() {
  const state = getUserState();
  const usernameEl = document.getElementById("acc-username");
  const createdEl = document.getElementById("acc-created");
  const locationEl = document.getElementById("acc-location");
  const historyListEl = document.getElementById("account-history-list");

  if (usernameEl) usernameEl.textContent = state.loggedUser || "User";
  if (createdEl) createdEl.textContent = localStorage.getItem(state.createdKey) || "Today";
  if (locationEl) locationEl.textContent = localStorage.getItem(state.locationKey) || "Holly Springs, Wake Co.";

  if (historyListEl) {
    const history = JSON.parse(localStorage.getItem(state.historyKey) || "[]");
    if (history.length === 0) {
      historyListEl.innerHTML = `<li class="history-item empty" style="color: #666; font-size: 0.9rem;">No recorded activity yet. Complete a task on the Log Actions page to record activity.</li>`;
    } else {
      historyListEl.innerHTML = history.slice().reverse().map(item => `
        <li class="history-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: #f8faf9; border-radius: 8px; border: 1px solid #e8f0ea;">
          <div>
            <strong style="color: #1b4332; font-size: 0.95rem;">${item.action}</strong>
            <div style="font-size: 0.8rem; color: #666; margin-top: 0.2rem;">${item.date}</div>
          </div>
          <span style="font-weight: 800; color: #2d5a27; background: #e8f5e9; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.85rem;">+${item.pts} Pts</span>
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

function quickJudgeLogin() {
  const accounts = JSON.parse(localStorage.getItem("orniflora_accounts") || "{}");
  accounts["StudentJudge"] = { password: "appchallenge2026" };
  localStorage.setItem("orniflora_accounts", JSON.stringify(accounts));
  localStorage.setItem("orniflora_pass_StudentJudge", "appchallenge2026");
  localStorage.setItem("orniflora_points_StudentJudge", "750");
  localStorage.setItem("orniflora_streak_StudentJudge", "14");
  localStorage.setItem("orniflora_location_StudentJudge", "Holly Springs, Wake Co.");
  
  sessionStorage.setItem("current_logged_user", "StudentJudge");
  window.location.href = "dashboard.html";
}

// Two-Step Account Deletion Handlers
function openDeleteAccountModal() {
  const modal = document.getElementById("delete-account-modal");
  if (modal) modal.style.display = "flex";
}

function closeDeleteAccountModal() {
  const modal = document.getElementById("delete-account-modal");
  if (modal) modal.style.display = "none";
}

function confirmDeleteAccount() {
  const currentUser = sessionStorage.getItem("current_logged_user");
  if (!currentUser) return;

  let accounts = JSON.parse(localStorage.getItem("orniflora_accounts") || "{}");
  delete accounts[currentUser];
  localStorage.setItem("orniflora_accounts", JSON.stringify(accounts));

  let users = JSON.parse(localStorage.getItem("orniflora_users") || "[]");
  users = users.filter(user => user !== currentUser);
  localStorage.setItem("orniflora_users", JSON.stringify(users));

  localStorage.removeItem(`orniflora_pass_${currentUser}`);
  localStorage.removeItem(`orniflora_points_${currentUser}`);
  localStorage.removeItem(`orniflora_streak_${currentUser}`);
  localStorage.removeItem(`orniflora_location_${currentUser}`);
  localStorage.removeItem(`orniflora_created_${currentUser}`);
  localStorage.removeItem(`orniflora_lastDate_${currentUser}`);
  localStorage.removeItem(`orniflora_history_${currentUser}`);

  sessionStorage.removeItem("current_logged_user");
  alert("Your account has been deleted.");
  window.location.href = "auth.html";
}

// ==========================================================================
// BULLETPROOF ACTIVITY SUBMISSION & IMAGE PREVIEW FIX
// ==========================================================================

window.previewUserImage = function(event) {
  const file = event.target.files[0];
  const fileNameDisplay = document.getElementById("file-name-display");
  const imgPreview = document.getElementById("image-preview");
  
  if (file) {
    if (fileNameDisplay) fileNameDisplay.textContent = file.name;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      if (imgPreview) {
        imgPreview.src = e.target.result;
        imgPreview.style.display = "block";
      }
    };
    reader.readAsDataURL(file);
  } else {
    if (fileNameDisplay) fileNameDisplay.textContent = "No file chosen";
    if (imgPreview) {
      imgPreview.src = "";
      imgPreview.style.display = "none";
    }
  }
};

window.submitTaskProof = function() {
  const noteInput = document.getElementById("proof-note");
  const note = noteInput ? noteInput.value.trim() : "";
  
  // Get active user or fallback to Rohan
  const currentUser = localStorage.getItem("orniflora_current_user") || "Rohan";
  
  // Award points (+50 points)
  let userPoints = parseInt(localStorage.getItem(`orniflora_points_${currentUser}`) || "0");
  userPoints += 50;
  localStorage.setItem(`orniflora_points_${currentUser}`, userPoints);

  // Save to activity history log
  let history = JSON.parse(localStorage.getItem(`orniflora_history_${currentUser}`) || "[]");
  const taskTitle = window.currentActiveTask || "Field Conservation Activity";
  
  history.unshift({
    title: taskTitle,
    note: note || "Completed field observation and habitat tracking.",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });
  localStorage.setItem(`orniflora_history_${currentUser}`, JSON.stringify(history));

  // Close the modal
  const modal = document.getElementById("ai-modal");
  if (modal) modal.style.display = "none";

  // Reset form fields
  if (noteInput) noteInput.value = "";
  
  const fileNameDisplay = document.getElementById("file-name-display");
  if (fileNameDisplay) fileNameDisplay.textContent = "No file chosen";
  
  const imgPreview = document.getElementById("image-preview");
  if (imgPreview) {
    imgPreview.src = "";
    imgPreview.style.display = "none";
  }

  // Refresh view if function exists
  if (typeof loadTasks === "function") {
    loadTasks();
  }

  alert("Activity submitted successfully! +50 points added to your score.");
};