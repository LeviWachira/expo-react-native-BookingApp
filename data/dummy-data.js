import Category from '../models/categoryRoom';
import Room from '../models/room';

export const CATEGORYROOM = [
    new Category(
        'c1',
        'Study Room',
        'https://library.tu.ac.th/sites/default/files/styles/punsarn_image_style/public/2018-10/03Room1-1.JPG?itok=qlNQqd3-'
    ),
    new Category(
        'c2',
        'Computer Room',
        'https://image.shutterstock.com/image-photo/empty-computer-room-elementary-school-260nw-262415444.jpg'
    ),
    new Category(
        'c3',
        'Theater Room',
        'https://www.lcdtvthailand.com/images/article/2018/Basic%20Home%20Theater%20FAQ/basichometheaterfaq_insert1.jpg'
    ),
];

export const ROOM = [

    //study room 
    new Room(
        Math.random().toString(),
        'c1',
        'Study Room1',
        'https://library.tu.ac.th/sites/default/files/styles/punsarn_image_style/public/2018-10/03Room1-1.JPG?itok=qlNQqd3-',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),

    new Room(
        Math.random().toString(),
        'c1',
        'Study Room2',
        'https://library.tu.ac.th/sites/default/files/styles/punsarn_image_style/public/2018-10/03Room1-1.JPG?itok=qlNQqd3-',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),

    new Room(
        Math.random().toString(),
        'c1',
        'Study Room3',
        'https://library.tu.ac.th/sites/default/files/styles/punsarn_image_style/public/2018-10/03Room1-1.JPG?itok=qlNQqd3-',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),

    new Room(
        'm4',
        'c1',
        'Study Room4',
        'https://library.tu.ac.th/sites/default/files/styles/punsarn_image_style/public/2018-10/03Room1-1.JPG?itok=qlNQqd3-',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),

    //computer room 
    new Room(
        'm5',
        'c2',
        'Computer Room1',
        'https://image.shutterstock.com/image-photo/empty-computer-room-elementary-school-260nw-262415444.jpg',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),

    new Room(
        'm6',
        'c2',
        'Computer Room2',
        'https://image.shutterstock.com/image-photo/empty-computer-room-elementary-school-260nw-262415444.jpg',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),

    new Room(
        'm7',
        'c2',
        'Computer Room3',
        'https://image.shutterstock.com/image-photo/empty-computer-room-elementary-school-260nw-262415444.jpg',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),

    //theater room
    new Room(
        'm8',
        'c3',
        'Theater Room1',
        'https://www.lcdtvthailand.com/images/article/2018/Basic%20Home%20Theater%20FAQ/basichometheaterfaq_insert1.jpg',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),

    new Room(
        'm9',
        'c3',
        'Theater Room2',
        'https://www.lcdtvthailand.com/images/article/2018/Basic%20Home%20Theater%20FAQ/basichometheaterfaq_insert1.jpg',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),

    new Room(
        'm10',
        'c3',
        'Theater Room3',
        'https://www.lcdtvthailand.com/images/article/2018/Basic%20Home%20Theater%20FAQ/basichometheaterfaq_insert1.jpg',
        '120 mins',
        [
            8.00,
            10.00,
            12.00,
            14.00,
            16.00
        ]
    ),
]


