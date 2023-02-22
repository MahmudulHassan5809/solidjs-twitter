import { Component } from "solid-js";
import { For } from "solid-js";

const trends = [
  {
    category: "Sports",
    content: "Some team won something",
    glideCount: 300,
  },
  {
    category: "Finance",
    content: "Bitcoin down again",
    glideCount: 200,
  },
  {
    category: "PC & Games",
    content: "New Eincode game out",
    glideCount: 300,
  },
  {
    category: "Economy",
    content: "It's going well",
    glideCount: 500,
  },
  {
    category: "Celebrities",
    content: "Some useless message",
    glideCount: 300,
  },
  {
    category: "Movies",
    content: "Peter Jackson as the director of new Lotr",
    glideCount: 1000,
  },
];

const TrendsSidebar: Component = () => (
  <div class="bg-gray-800 overflow-hidden flex-it rounded-2xl">
    <div class="flex-it p-4">
      <span class="text-xl font-bold">Trends</span>
    </div>
    <For each={trends}>
      {(item) => (
        <div class="flex-it p-4 cursor-pointer transition duration-200 hover:bg-gray-700">
          <div class="flex-it">
            <span class="text-gray-400 text-sm">{item.content}</span>
            <span class="text-lg font-bold">{item.category}</span>
            <span class="text-gray-400 text-sm">{item.glideCount} glides</span>
          </div>
        </div>
      )}
    </For>
  </div>
);

export default TrendsSidebar;
