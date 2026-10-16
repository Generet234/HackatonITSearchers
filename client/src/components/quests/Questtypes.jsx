// Описание всех категорий квестов. Фильтры потом легко заменить на запросы к API.
export const QUEST_TYPES = {
    local: {
        path: 'local',
        title: 'Локальные квесты',
        description: 'Рядом с вами: можно дойти пешком или доехать за несколько минут.',
        filter: (q) => q.distanceKm <= 5,
    },
    unpopular: {
        path: 'unpopular',
        title: 'Малопопулярные квесты',
        description: 'На них почти никто не откликнулся, вашей помощи здесь особенно рады.',
        filter: (q) => q.responses <= 1,
    },
    short: {
        path: 'short',
        title: 'Короткие квесты',
        description: 'Займут до 1 часа.',
        filter: (q) => q.durationHours <= 1,
    },
    long: {
        path: 'long',
        title: 'Долгие квесты',
        description: 'Займут больше 1 часа.',
        filter: (q) => q.durationHours > 1,
    },
    urgent: {
        path: 'urgent',
        title: 'Срочные квесты',
        description: 'Требуют немедленного привлечения. Множитель x2–x3 XP!',
        filter: (q) => q.urgent,
    },
};

export const QUEST_TYPE_LIST = Object.values(QUEST_TYPES);
