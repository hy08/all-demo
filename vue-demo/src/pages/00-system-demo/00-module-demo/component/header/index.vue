<template>
  <div class="header">
    <div class="title">
      <h1>{{ title }}</h1>
      <span @click="goAboutMe">
        作者：
        <span>{{ author.name }}</span>
      </span>
    </div>
  </div>
</template>

<script src="./index.ts"></script>

<style src="./index.less" lang="less" scoped></style>
