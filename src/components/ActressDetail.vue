<template>
    <el-card v-if="actress && actress.id > 0">
        <el-row>
            <div>
                <el-avatar shape="square" :size="125" :src="avatarURL" />
            </div>
            <div>
                <el-row align="bottom">
                    <h2 v-if="actress.name" id="actress-name">{{ actress.name }}</h2>
                    <span v-if="actress.ruby" id="actress-ruby">{{ actress.ruby }}</span>
                </el-row>
                <span v-if="actress.bust">胸围:{{ actress.bust }}</span>
                <span v-if="actress.cup">罩杯:{{ actress.cup }}</span>
                <span v-if="actress.waist">腰围:{{ actress.waist }}</span>
                <span v-if="actress.hip">臀围:{{ actress.hip }}</span>
                <span v-if="actress.height">身高:{{ actress.height }}</span>
                <br>
                <span v-if="age">年龄:{{ age }}</span>
                <span v-if="actress.birthday">生日:{{ actress.birthday }}</span>
                <span v-if="actress.blood_type">血型:{{ actress.blood_type }}</span>
                <span v-if="actress.hobby">爱好:{{ actress.hobby }}</span>
                <span v-if="actress.prefectures">出生地:{{ actress.prefectures }}</span>
            </div>
        </el-row>
    </el-card>
</template>

<script>
import dayjs from 'dayjs'
export default {
    name: 'ActressDetail',
    props: {
        actress: {
            type: Object,
            default: () => { }
        },
    },
    computed: {
        avatarURL() {
            if (this.actress.imageURL && this.actress.imageURL.large) {
                if (this.actress.imageURL.large) {
                    return this.actress.imageURL.large
                }
                else if (this.actress.imageURL.small) {
                    this.actress.imageURL.small
                }
            }
            return '/img/act-no-image.gif'
        },
        age() {
            if (this.actress.birthday) {
                // const birthDate = new Date(this.actress.birthday);
                // const momentDate = new Date();
                // momentDate.setHours(0, 0, 0, 0); 
                // const thisYearBirthDate = new Date(
                //     momentDate.getFullYear(),
                //     birthDate.getMonth(),
                //     birthDate.getDate()
                // );
                // const aDate = thisYearBirthDate - birthDate;
                // const bDate = momentDate - birthDate;
                // let tempAge = momentDate.getFullYear() - birthDate.getFullYear();
                // let age = null;
                // if (bDate < aDate) {
                //     tempAge = tempAge - 1;
                //     age = tempAge < 0 ? 0 : tempAge;
                // } else {
                //     age = tempAge;
                // }
                // return age;
                // dayjs.extend(relativeTime)
                // dayjs.extend(zh)
                // return dayjs(this.actress.birthday).fromNow()
                return dayjs().diff(this.actress.birthday, 'year')
            }
            return null
        }
    }
}
</script>

<style>
#actress-name {
    display: contents;
}

#actress-ruby {
    margin-left: 5px;
}
</style>