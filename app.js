//   check if user logged in
function checkAuthGuard() {
  const currUser = sessionStorage.getItem("current_logged_user");
  const pg = document.body ? document.body.dataset.page : "";
  if (!currUser && pg !== "auth" && !window.location.pathname.endsWith("auth.html")) {
    window.location.href = "auth.html";
  }
}

// figure out refuge tier based on score
function getRefugeTierInfo(pts) {
  if (pts >= 2500) {
    return { level: 7, title: "Veteran Habitat", badgeClass: "tier-7" };
  } else if (pts >= 1000) {
    return { level: 6, title: "Certified Sanctuary", badgeClass: "tier-6" };
  } else if (pts >= 500) {
    return { level: 5, title: "Ginormous Garden", badgeClass: "tier-5" };
  } else if (pts >= 750) {
    return { level: 4, title: "Microhabitat", badgeClass: "tier-4" };
  } else if (pts >= 300) {
    return { level: 3, title: "Beginner Garden", badgeClass: "tier-3" };
  } else if (pts >= 100) {
    return { level: 2, title: "Seedling Sanctuary", badgeClass: "tier-2" };
  } else {
    return { level: 1, title: "Baby Habitat", badgeClass: "tier-1" };
  }
}

//  ecosystem matchmaking database
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


// county wildlife data
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


// town stats
const TOWN_REAL_DATA = {
  "Milton": { popDensity: 150, imperviousPct: 6, canopyPct: 80, migIndex: 64 },
  "Yanceyville": { popDensity: 240, imperviousPct: 10, canopyPct: 77, migIndex: 67 },
  "Bunn": { popDensity: 210, imperviousPct: 9, canopyPct: 76, migIndex: 68 },
  "Franklinton": { popDensity: 920, imperviousPct: 29, canopyPct: 64, migIndex: 75 },
  "Louisburg": { popDensity: 780, imperviousPct: 25, canopyPct: 66, migIndex: 72 },
  "Butner": { popDensity: 820, imperviousPct: 30, canopyPct: 63, migIndex: 73 },
  "Creedmoor": { popDensity: 1100, imperviousPct: 34, canopyPct: 60, migIndex: 75 },
  "Oxford": { popDensity: 950, imperviousPct: 28, canopyPct: 65, migIndex: 71 },
  "Stovall": { popDensity: 180, imperviousPct: 8, canopyPct: 78, migIndex: 65 },
  "Angier": { popDensity: 1120, imperviousPct: 33, canopyPct: 56, migIndex: 77 },
  "Dunn": { popDensity: 1350, imperviousPct: 38, canopyPct: 51, migIndex: 75 },
  "Lillington": { popDensity: 690, imperviousPct: 22, canopyPct: 63, migIndex: 74 },
  "Benson": { popDensity: 740, imperviousPct: 24, canopyPct: 61, migIndex: 72 },
  "Clayton": { popDensity: 1540, imperviousPct: 44, canopyPct: 52, migIndex: 82 },
  "Selma": { popDensity: 980, imperviousPct: 31, canopyPct: 58, migIndex: 74 },
  "Smithfield": { popDensity: 1210, imperviousPct: 37, canopyPct: 55, migIndex: 76 },
  "Broadway": { popDensity: 310, imperviousPct: 12, canopyPct: 72, migIndex: 69 },
  "Sanford": { popDensity: 1420, imperviousPct: 39, canopyPct: 57, migIndex: 78 },
  "Roxboro": { popDensity: 890, imperviousPct: 26, canopyPct: 68, migIndex: 70 },
  "Apex": { popDensity: 1950, imperviousPct: 42, canopyPct: 55, migIndex: 83 },
  "Cary": { popDensity: 2600, imperviousPct: 46, canopyPct: 58, migIndex: 85 },
  "Fuquay-Varina": { popDensity: 1450, imperviousPct: 35, canopyPct: 54, migIndex: 79 },
  "Garner": { popDensity: 1780, imperviousPct: 41, canopyPct: 50, migIndex: 82 },
  "Holly Springs": { popDensity: 1620, imperviousPct: 38, canopyPct: 56, migIndex: 81 },
  "Knightdale": { popDensity: 1320, imperviousPct: 36, canopyPct: 57, migIndex: 79 },
  "Morrisville": { popDensity: 2850, imperviousPct: 52, canopyPct: 48, migIndex: 84 },
  "Raleigh": { popDensity: 3150, imperviousPct: 58, canopyPct: 53, migIndex: 88 },
  "Wake Forest": { popDensity: 1890, imperviousPct: 40, canopyPct: 55, migIndex: 83 },
  "Zebulon": { popDensity: 650, imperviousPct: 22, canopyPct: 62, migIndex: 74 }
};

// tasks data
const AVAILABLE_TASKS = [
  { id: "birdbath", title: "Clean or Refill a Birdbath", pts: 25, desc: "Provide clean water for resident songbirds." },
  { id: "feeder", title: "Maintain a Bird Feeder", pts: 30, desc: "Fill feeders with native seed or suet." },
  { id: "plant_native", title: "Plant a Native Species", pts: 50, desc: "Add native flora suited to your regional climate." },
  { id: "water_plant", title: "Water Native Gardens", pts: 15, desc: "Maintain garden areas during dry summer weather." },
  { id: "remove_invasive", title: "Remove Invasive Vegetation", pts: 40, desc: "Clear non-native weeds to allow native plants to grow." }
];

//   grab user stuff
function getUserState() {
  const usr = sessionStorage.getItem("current_logged_user") || "";
  return {
    loggedUser: usr,
    points: usr ? parseInt(localStorage.getItem(`orniflora_points_${usr}`) || "0") : 0,
    streak: usr ? parseInt(localStorage.getItem(`orniflora_streak_${usr}`) || "0") : 0,
    lastLoggedDate: usr ? localStorage.getItem(`orniflora_lastDate_${usr}`) || "" : "",
    locationKey: `orniflora_location_${usr}`,
    pointsKey: `orniflora_points_${usr}`,
    streakKey: `orniflora_streak_${usr}`,
    dateKey: `orniflora_lastDate_${usr}`,
    historyKey: `orniflora_history_${usr}`,
    createdKey: `orniflora_created_${usr}`
  };
}

// get town & county
function getUserLocationInfo(username) {
  const locStr = localStorage.getItem(`orniflora_location_${username}`) || "Holly Springs, Wake Co.";
  let town = "Holly Springs";
  let county = "Wake";
  if (locStr.includes(",")) {
    const p = locStr.split(",");
    town = p[0].trim();
    if (p[1]) {
      county = p[1].replace("Co.", "").replace("County", "").trim();
    }
  }
  return { town, county };
}

// render birds and plants on dashboard
function renderTownSpecies() {
  const st = getUserState();
  const { town, county } = getUserLocationInfo(st.loggedUser);
  const info = TOWN_SPECIES_DATA[county] || TOWN_SPECIES_DATA["Wake"];
  
  const bLbl = document.getElementById("town-birds-label");
  const pLbl = document.getElementById("town-plants-label");
  if (bLbl) bLbl.textContent = `${town} (${county} Co.)`;
  if (pLbl) pLbl.textContent = `${town} (${county} Co.)`;

  const birdsDiv = document.getElementById("regional-birds-list");
  const plantsDiv = document.getElementById("regional-plants-list");

  if (birdsDiv) {
    birdsDiv.innerHTML = info.birds.map(b => `
      <div class="species-card" onclick="inspectSpeciesInteraction('${b.name.replace(/'/g, "\\'")}')">
        <img src="${b.img}" alt="${b.name}" onerror="this.src='assets/images/birds/eastern-bluebird.jpg';">
        <p>${b.name}</p>
      </div>
    `).join("");
  }

  if (plantsDiv) {
    plantsDiv.innerHTML = info.plants.map(p => `
      <div class="species-card" onclick="inspectSpeciesInteraction('${p.name.replace(/'/g, "\\'")}')">
        <img src="${p.img}" alt="${p.name}" onerror="this.src='assets/images/plants/purple-coneflower.jpg';">
        <p>${p.name}</p>
      </div>
    `).join("");
  }
}

// popup modal for ecosystem
function inspectSpeciesInteraction(nm) {
  const mod = document.getElementById("ecosystem-modal");
  const t = document.getElementById("eco-modal-title");
  const d = document.getElementById("eco-modal-desc");
  const c = document.getElementById("eco-modal-chip");
  const h = document.getElementById("eco-pairings-heading");
  const lst = document.getElementById("eco-pairings-list");
  const tp = document.getElementById("eco-modal-tip");

  const dat = ECOSYSTEM_MATCHMAKER[nm] || {
    type: "plant",
    desc: `${nm} plays a role in supporting local species diversity in North Carolina.`,
    pairings: ["Eastern Bluebird", "Northern Cardinal", "Carolina Chickadee"],
    tip: "Plant native species in groups to maximize shelter and food."
  };

  if (t) t.textContent = nm;
  if (d) d.textContent = dat.desc;

  if (c) {
    if (dat.type === "bird") {
      c.textContent = "Native Bird Species";
      c.className = "modal-category-chip chip-bird";
      if (h) h.textContent = "Supported Plants";
    } else {
      c.textContent = "Native Plant Species";
      c.className = "modal-category-chip chip-plant";
      if (h) h.textContent = "Attracted Birds";
    }
  }

  if (lst) {
    lst.innerHTML = dat.pairings.map(item => `
      <span class="pairing-chip">${item}</span>
    `).join("");
  }

  if (tp) {
    tp.innerHTML = `<strong>Yard Action:</strong> ${dat.tip}`;
  }

  if (mod) mod.style.display = "flex";
}

function closeEcoModal() {
  const mod = document.getElementById("ecosystem-modal");
  if (mod) mod.style.display = "none";
}

function renderDynamicSpotlight() {
  const tBox = document.getElementById("spotlight-title");
  const dBox = document.getElementById("spotlight-desc");
  if (!tBox || !dBox) return;
}

// compute migration & stress score
function renderBioCorridorIndex() {
  const titleBox = document.getElementById("flyway-title");
  const densityBox = document.getElementById("flyway-density");
  const yardBox = document.getElementById("yard-refuge-level");
  const stressBox = document.getElementById("corridor-stress");
  const fillBar = document.getElementById("meter-fill");
  const topAct = document.getElementById("top-recommended-action");

  if (!densityBox) return;

  const st = getUserState();
  const { town } = getUserLocationInfo(st.loggedUser);
  const pts = st.points;
  const m = new Date().getMonth();

  const tInfo = TOWN_REAL_DATA[town] || { popDensity: 1000, imperviousPct: 30, canopyPct: 60, migIndex: 75 };

  const stScore = (0.6 * tInfo.imperviousPct) + (0.4 * Math.min(100, tInfo.popDensity / 40));
  let stLbl = "Moderate Need";
  if (stScore >= 75) stLbl = "Critical Need";
  else if (stScore >= 50) stLbl = "High Need";
  else if (stScore >= 25) stLbl = "Moderate Need";
  else stLbl = "Low Need";

  const isPeakTime = [2, 3, 4, 6, 7, 8, 9].includes(m);
  let mult = isPeakTime ? 1.08 : 0.85;
  let seasonTxt = isPeakTime ? "Peak Migration Period" : "Off-Peak Season";
  let canopyF = tInfo.canopyPct / 55;
  let migVal = Math.min(98, Math.round(tInfo.migIndex * canopyF * mult * 0.9));

  let recAct = "Fill Seed Feeder";
  if (tInfo.imperviousPct >= 40) {
    recAct = "Clean Water Source";
  } else if (tInfo.canopyPct < 55) {
    recAct = "Plant Native Species";
  } else if (tInfo.popDensity < 300) {
    recAct = "Protect Native Berry Shrubs";
  } else {
    recAct = "Retain Seed Heads";
  }

  const tierObj = getRefugeTierInfo(pts);

  if (titleBox) titleBox.textContent = `${town} Migration Status`;
  if (densityBox) densityBox.textContent = `${seasonTxt} (${migVal}%)`;
  if (fillBar) fillBar.style.width = `${migVal}%`;
  if (stressBox) stressBox.textContent = stLbl;
  if (yardBox) yardBox.textContent = tierObj.title;
  if (topAct) topAct.textContent = recAct;
}

// handle login
function handleLoginSubmit(e) {
  if (e) e.preventDefault();
  const uInput = document.getElementById("login-username");
  const pInput = document.getElementById("login-password");

  if (!uInput || !pInput) return;
  const usr = uInput.value.trim();
  const pwd = pInput.value;

  if (!usr || !pwd) {
    alert("Please enter both a username and password.");
    return;
  }

  const allAccs = JSON.parse(localStorage.getItem("orniflora_accounts") || "{}");
  const oldPwd = localStorage.getItem(`orniflora_pass_${usr}`);
  const ok = (allAccs[usr] && allAccs[usr].password === pwd) || (oldPwd === pwd);

  if (!ok) {
    alert("Incorrect username or password.");
    return;
  }

  sessionStorage.setItem("current_logged_user", usr);
  window.location.href = "dashboard.html";
}

// handle signup
function handleSignupSubmit(e) {
  if (e) e.preventDefault();
  const uInput = document.getElementById("signup-username");
  const pInput = document.getElementById("signup-password");
  const cpInput = document.getElementById("signup-confirm-password");
  const countySel = document.getElementById("countySelect");
  const citySel = document.getElementById("citySelect");

  if (!uInput || !pInput) return;
  const usr = uInput.value.trim();
  const pwd = pInput.value;
  const cpwd = cpInput ? cpInput.value : pwd;
  const county = countySel && countySel.value ? countySel.value : "Wake";
  const city = citySel && citySel.value ? citySel.value : "Holly Springs";

  if (!usr || !pwd) {
    alert("Please fill in all required fields.");
    return;
  }

  if (pwd !== cpwd) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  // clear old data if name reused
  localStorage.removeItem(`orniflora_points_${usr}`);
  localStorage.removeItem(`orniflora_score_${usr}`);
  localStorage.removeItem(`orniflora_streak_${usr}`);
  localStorage.removeItem(`orniflora_lastDate_${usr}`);
  localStorage.removeItem(`orniflora_history_${usr}`);
  localStorage.removeItem(`orniflora_created_${usr}`);
  localStorage.removeItem(`orniflora_location_${usr}`);
  localStorage.removeItem(`orniflora_pass_${usr}`);

  const oldKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.includes(`_${usr}`) && k.startsWith("orniflora_task_")) {
      oldKeys.push(k);
    }
  }
  oldKeys.forEach(k => localStorage.removeItem(k));

  let allAccs = JSON.parse(localStorage.getItem("orniflora_accounts") || "{}");
  if (allAccs[usr]) {
    alert("This username is already taken on this browser. Please select another.");
    return;
  }

  allAccs[usr] = { password: pwd };
  localStorage.setItem("orniflora_accounts", JSON.stringify(allAccs));

  let usersArr = JSON.parse(localStorage.getItem("orniflora_users") || "[]");
  if (!usersArr.includes(usr)) {
    usersArr.push(usr);
    localStorage.setItem("orniflora_users", JSON.stringify(usersArr));
  }

  localStorage.setItem(`orniflora_pass_${usr}`, pwd);
  localStorage.setItem(`orniflora_location_${usr}`, `${city}, ${county} Co.`);

  const dtStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  localStorage.setItem(`orniflora_created_${usr}`, dtStr);

  sessionStorage.setItem("current_logged_user", usr);
  window.location.href = "dashboard.html";
}

function toggleProfileMenu(e) {
  if (e) e.stopPropagation();
  const drop = document.getElementById("profile-dropdown");
  if (drop) drop.classList.toggle("show");
}

document.addEventListener("click", (e) => {
  const drop = document.getElementById("profile-dropdown");
  if (drop && drop.classList.contains("show")) {
    const pBtn = document.querySelector(".profile-btn");
    if (!pBtn || !pBtn.contains(e.target)) {
      drop.classList.remove("show");
    }
  }
});

// render tasks
function renderTasksPage() {
  const listEl = document.getElementById("tasks-list");
  if (!listEl) return;

  const st = getUserState();
  if (!st.loggedUser) {
    listEl.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Please log in to view and complete daily tasks.</p>';
    return;
  }

  const dtToday = new Date().toISOString().split("T")[0];

  listEl.innerHTML = AVAILABLE_TASKS.map(t => {
    const lastDone = localStorage.getItem(`orniflora_task_${t.id}_lastDate_${st.loggedUser}`);
    const isDoneToday = (lastDone === dtToday);

    return `
      <div class="task-card ${isDoneToday ? 'completed-card' : ''}">
        <div class="task-info">
          <h4>${t.title} <span class="task-badge">+${t.pts} Pts</span></h4>
          <p>${t.desc}</p>
        </div>
        <button
          onclick="triggerTaskVerification('${t.id}', '${t.title}', ${t.pts})"
          class="btn-task"
          ${isDoneToday ? 'disabled' : ''}>
          ${isDoneToday ? 'Logged Today' : 'Record Activity'}
        </button>
      </div>
    `;
  }).join("");
}

let activeTaskId = null;
let activeTaskTitle = "";
let activeTaskPts = 0;
let uploadedPhotoData = "";

function triggerTaskVerification(tid, title, ptsVal) {
  const st = getUserState();
  if (!st.loggedUser) {
    alert("Please log in to record activities.");
    window.location.href = "auth.html";
    return;
  }

  const dtToday = new Date().toISOString().split("T")[0];
  const lastDone = localStorage.getItem(`orniflora_task_${tid}_lastDate_${st.loggedUser}`);

  if (lastDone === dtToday) {
    alert("You have already logged this activity today. Come back tomorrow!");
    return;
  }

  activeTaskId = tid;
  activeTaskTitle = title;
  activeTaskPts = ptsVal;

  window.currentTaskId = tid;
  window.currentActiveTask = title;
  window.currentTaskPoints = ptsVal;

  const mTitle = document.getElementById("modal-task-title");
  if (mTitle) mTitle.textContent = `Log: ${title}`;

  const noteBox = document.getElementById("proof-note");
  if (noteBox) noteBox.value = "";

  const imgPrev = document.getElementById("image-preview");
  if (imgPrev) imgPrev.style.display = "none";

  const fileIn = document.getElementById("photo-input");
  if (fileIn) fileIn.value = "";

  const fileLbl = document.getElementById("file-name-display");
  if (fileLbl) fileLbl.textContent = "No file chosen";

  const mod = document.getElementById("ai-modal");
  if (mod) mod.style.display = "flex";
}

window.previewUserImage = function(e) {
  const f = e.target.files[0];
  const fileLbl = document.getElementById("file-name-display");
  const imgPrev = document.getElementById("image-preview");

  if (f) {
    if (fileLbl) fileLbl.textContent = f.name;
    const reader = new FileReader();
    reader.onload = function(evt) {
      uploadedPhotoData = evt.target.result;
      if (imgPrev) {
        imgPrev.src = uploadedPhotoData;
        imgPrev.style.display = "block";
      }
    };
    reader.readAsDataURL(f);
  } else {
    if (fileLbl) fileLbl.textContent = "No file chosen";
    if (imgPrev) {
      imgPrev.src = "";
      imgPrev.style.display = "none";
    }
  }
};

window.submitTaskProof = function() {
  const usr = sessionStorage.getItem("current_logged_user");
  if (!usr) {
    alert("Error: No active user session found. Please log in again.");
    window.location.href = "auth.html";
    return;
  }

  const noteBox = document.getElementById("proof-note");
  const txtNote = noteBox ? noteBox.value.trim() : "";

  const fileIn = document.getElementById("photo-input");
  const hasFile = fileIn && fileIn.files && fileIn.files.length > 0;

  // need both note and pic
  if (!txtNote || (!hasFile && !uploadedPhotoData)) {
    alert("Please provide BOTH a description note and upload a photo proof to submit this activity.");
    return;
  }

  if (hasFile && !uploadedPhotoData) {
    uploadedPhotoData = "assets/images/placeholder.jpg";
  }

  const ptsToAdd = window.currentTaskPoints ? parseInt(window.currentTaskPoints) : 50;

  const st = getUserState();
  let currentScore = parseInt(localStorage.getItem(st.pointsKey) || "0");
  let updatedScore = currentScore + ptsToAdd;

  localStorage.setItem(st.pointsKey, updatedScore.toString());
  localStorage.setItem(`orniflora_score_${usr}`, updatedScore.toString());

  const dtToday = new Date().toISOString().split("T")[0];
  if (window.currentTaskId) {
    localStorage.setItem(`orniflora_task_${window.currentTaskId}_lastDate_${usr}`, dtToday);
  }

  const lastDate = localStorage.getItem(st.dateKey);
  let streakCnt = parseInt(localStorage.getItem(st.streakKey) || "0");

  if (lastDate !== dtToday) {
    if (lastDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split("T")[0];
      if (lastDate === yStr) {
        streakCnt += 1;
      } else {
        streakCnt = 1;
      }
    } else {
      streakCnt = 1;
    }
    localStorage.setItem(st.streakKey, streakCnt.toString());
    localStorage.setItem(st.dateKey, dtToday);
  }

  let hist = JSON.parse(localStorage.getItem(st.historyKey) || "[]");
  const tName = window.currentActiveTask || "Field Conservation Activity";
  const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  hist.push({
    action: tName,
    pts: ptsToAdd,
    date: dateStr
  });
  localStorage.setItem(st.historyKey, JSON.stringify(hist));

  let usersArr = JSON.parse(localStorage.getItem("orniflora_users") || "[]");
  if (!usersArr.includes(usr)) {
    usersArr.push(usr);
    localStorage.setItem("orniflora_users", JSON.stringify(usersArr));
  }

  const mod = document.getElementById("ai-modal");
  if (mod) mod.style.display = "none";

  if (noteBox) noteBox.value = "";
  uploadedPhotoData = "";

  const fileLbl = document.getElementById("file-name-display");
  if (fileLbl) fileLbl.textContent = "No file chosen";

  const imgPrev = document.getElementById("image-preview");
  if (imgPrev) {
    imgPrev.src = "";
    imgPrev.style.display = "none";
  }

  if (typeof renderTasksPage === "function") renderTasksPage();
  if (typeof renderLeaderboard === "function") renderLeaderboard();
  if (typeof renderAccountPage === "function") renderAccountPage();
  if (typeof renderBioCorridorIndex === "function") renderBioCorridorIndex();

  alert(`Activity submitted successfully! +${ptsToAdd} points added to your score.`);
};

function closeAIModal() {
  const mod = document.getElementById("ai-modal");
  if (mod) mod.style.display = "none";
}

// leaderboard rendering
function renderLeaderboard() {
  const box = document.getElementById("leaderboard-list");
  if (!box) return;

  const st = getUserState();
  let usersArr = JSON.parse(localStorage.getItem("orniflora_users") || "[]");

  if (st.loggedUser && !usersArr.includes(st.loggedUser)) {
    usersArr.push(st.loggedUser);
    localStorage.setItem("orniflora_users", JSON.stringify(usersArr));
  }

  let sortedUsers = usersArr.map(u => {
    const p = parseInt(localStorage.getItem(`orniflora_points_${u}`) || "0");
    const s = parseInt(localStorage.getItem(`orniflora_streak_${u}`) || "0");
    const tr = getRefugeTierInfo(p);
    return { name: u, score: p, streak: s, tier: tr };
  });

  if (sortedUsers.length === 0) {
    sortedUsers.push({ name: "EcoTracker99", score: 850, streak: 18, tier: getRefugeTierInfo(850) });
    sortedUsers.push({ name: "NC_BirdWatcher", score: 420, streak: 9, tier: getRefugeTierInfo(420) });
  }

  sortedUsers.sort((a, b) => b.score - a.score);

  box.innerHTML = sortedUsers.map((userObj, idx) => `
    <div class="leaderboard-row ${userObj.name === st.loggedUser ? 'highlight-user' : ''}">
      <div class="user-meta">
        <span class="rank-num">#${idx + 1}</span>
        <div>
          <strong class="user-name">${userObj.name}</strong>
          <div class="tier-pill-badge ${userObj.tier.badgeClass}">${userObj.tier.title}</div>
        </div>
      </div>
      <div class="user-score-info">
        <span class="score-num">${userObj.score} pts</span>
        <span class="streak-count">${userObj.streak}d streak</span>
      </div>
    </div>
  `).join("");
}

// account profile rendering
function renderAccountPage() {
  const st = getUserState();
  const uEl = document.getElementById("acc-username");
  const cEl = document.getElementById("acc-created");
  const lEl = document.getElementById("acc-location");
  const hBox = document.getElementById("account-history-list");

  if (uEl) uEl.textContent = st.loggedUser || "User";
  if (cEl) cEl.textContent = localStorage.getItem(st.createdKey) || "Today";
  if (lEl) lEl.textContent = localStorage.getItem(st.locationKey) || "Holly Springs, Wake Co.";

  if (hBox) {
    const hist = JSON.parse(localStorage.getItem(st.historyKey) || "[]");
    if (hist.length === 0) {
      hBox.innerHTML = `<li class="history-item empty" style="color: #666; font-size: 0.9rem;">No recorded activity yet. Complete a task on the Log Actions page to record activity.</li>`;
    } else {
      hBox.innerHTML = hist.slice().reverse().map(item => `
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

function saveUserScore(ptsAdded, actTitle = "Earned Points") {
  const st = getUserState();
  let total = st.points + ptsAdded;
  let strk = st.streak;

  const dtToday = new Date().toISOString().split("T")[0];
  if (st.lastLoggedDate !== dtToday) {
    strk += 1;
    localStorage.setItem(st.dateKey, dtToday);
    localStorage.setItem(st.streakKey, strk.toString());
  }

  const hist = JSON.parse(localStorage.getItem(st.historyKey) || "[]");
  const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  hist.push({ action: actTitle, pts: ptsAdded, date: dateStr });

  localStorage.setItem(st.historyKey, JSON.stringify(hist));
  localStorage.setItem(st.pointsKey, total.toString());

  const ptsBox = document.getElementById("user-points");
  if (ptsBox) ptsBox.textContent = total;
}

// page startup init
function initPage(pageType = "dashboard") {
  const st = getUserState();
  const navUser = document.getElementById("nav-username");
  const dashUser = document.getElementById("dashUser");
  const locLbl = document.getElementById("user-location-label");

  if (navUser) navUser.textContent = st.loggedUser || "Guest";
  if (dashUser) dashUser.textContent = st.loggedUser || "Guest";

  const savedLoc = localStorage.getItem(st.locationKey) || "Holly Springs, Wake Co.";
  if (locLbl) locLbl.textContent = savedLoc;

  const ptsBox = document.getElementById("user-points");
  const strkBox = document.getElementById("user-streak");

  if (ptsBox) ptsBox.textContent = st.points;
  if (strkBox) strkBox.textContent = st.streak;

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
  const pg = document.body ? (document.body.dataset.page || "dashboard") : "dashboard";
  if (pg !== "auth") {
    initPage(pg);
  }
});

// quick login for testing/judges
function quickJudgeLogin() {
  const allAccs = JSON.parse(localStorage.getItem("orniflora_accounts") || "{}");
  allAccs["StudentJudge"] = { password: "appchallenge2026" };
  localStorage.setItem("orniflora_accounts", JSON.stringify(allAccs));
  localStorage.setItem("orniflora_pass_StudentJudge", "appchallenge2026");
  localStorage.setItem("orniflora_points_StudentJudge", "750");
  localStorage.setItem("orniflora_streak_StudentJudge", "14");
  localStorage.setItem("orniflora_location_StudentJudge", "Holly Springs, Wake Co.");

  sessionStorage.setItem("current_logged_user", "StudentJudge");
  window.location.href = "dashboard.html";
}

// delete account actions
function openDeleteAccountModal() {
  const mod = document.getElementById("delete-account-modal");
  if (mod) mod.style.display = "flex";
}

function closeDeleteAccountModal() {
  const mod = document.getElementById("delete-account-modal");
  if (mod) mod.style.display = "none";
}

function confirmDeleteAccount() {
  const usr = sessionStorage.getItem("current_logged_user");
  if (!usr) return;

  let allAccs = JSON.parse(localStorage.getItem("orniflora_accounts") || "{}");
  delete allAccs[usr];
  localStorage.setItem("orniflora_accounts", JSON.stringify(allAccs));

  let usersArr = JSON.parse(localStorage.getItem("orniflora_users") || "[]");
  usersArr = usersArr.filter(u => u !== usr);
  localStorage.setItem("orniflora_users", JSON.stringify(usersArr));

  localStorage.removeItem(`orniflora_pass_${usr}`);
  localStorage.removeItem(`orniflora_points_${usr}`);
  localStorage.removeItem(`orniflora_score_${usr}`);
  localStorage.removeItem(`orniflora_streak_${usr}`);
  localStorage.removeItem(`orniflora_location_${usr}`);
  localStorage.removeItem(`orniflora_created_${usr}`);
  localStorage.removeItem(`orniflora_lastDate_${usr}`);
  localStorage.removeItem(`orniflora_history_${usr}`);

  sessionStorage.removeItem("current_logged_user");
  alert("Your account has been deleted.");
  window.location.href = "auth.html";
}

