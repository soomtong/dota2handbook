<heroes>
    <div class="choice">
        <ul class="forms-inline-list">
            <li>
                <input type="checkbox" name="checkbox-1" id="checkbox-1">
                <label for="checkbox-1">근접</label>
            </li>
            <li>
                <input type="checkbox" name="checkbox-2" id="checkbox-2">
                <label for="checkbox-2">원거리</label>
            </li>
            <br/>
            <li>
                <input type="checkbox" name="checkbox-3" id="checkbox-3">
                <label for="checkbox-3">캐리</label>
            </li>
            <li>
                <input type="checkbox" name="checkbox-4" id="checkbox-4">
                <label for="checkbox-4">전투개시자</label>
            </li>
            <li>
                <input type="checkbox" name="checkbox-5" id="checkbox-5">
                <label for="checkbox-5">지원</label>
            </li>
        </ul>
    </div>

    <div class="order">
        <ul class="forms-inline-list">
            <li>
                <input type="radio" name="hero_list_order" id="radio-hero-name1">
                <label for="radio-hero-name1">한글 이름</label>
            </li>
            <li>
                <input type="radio" name="hero_list_order" id="radio-hero-name2">
                <label for="radio-hero-name2">영문 이름</label>
            </li>
        </ul>
        <ul class="forms-inline-list">
            <li>
                <input type="radio" name="hero_list_order" id="radio-hero-type1">
                <label for="radio-hero-type1">이동속도</label>
            </li>
            <li>
                <input type="radio" name="hero_list_order" id="radio-hero-type2">
                <label for="radio-hero-type2">공격속도</label>
            </li>
            <li>
                <input type="radio" name="hero_list_order" id="radio-hero-type3">
                <label for="radio-hero-type3">체력증가</label>
            </li>
            <li>
                <input type="radio" name="hero_list_order" id="radio-hero-type4">
                <label for="radio-hero-type4">민첩증가</label>
            </li>
            <li>
                <input type="radio" name="hero_list_order" id="radio-hero-type5">
                <label for="radio-hero-type5">지능증가</label>
            </li>
        </ul>
    </div>

    <div class="nav nav-stats list">
        <ul>
            <li each={{ heroes }} id="{{ id }}">
                <img src="{{ pic }}" alt="{{ subtitle }}"/>
                {{ title }} <small class="subtitle">{{ subtitle }}</small>
                <b class="badge badge-small {{ Hero.showTypeColor(hero_category) }}">{{ Hero.showType(hero_category) }}</b>
            </li>
        </ul>
    </div>
    <script>
        this.heroes = $.makeArray(this.opts);
    </script>
</heroes>
