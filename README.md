# LLMOps AppBuilder

<div align="center">
  <p>一个强大的AI/Agent开发平台，帮助您快速构建、部署和管理AI应用</p>
  <p>服务: https://github.com/v833/llmops-api</p>
</div>

## 📖 项目介绍

LLMOps AppBuilder是一个现代化的AI应用开发平台，专注于简化大语言模型(LLM)和智能体(Agent)的开发流程。通过直观的界面和强大的工具集，使开发者能够快速构建、测试和部署AI应用，无需深入了解底层复杂性。

### 主要功能

- 🤖 **AI应用构建**：通过可视化界面快速创建和配置AI应用
- 🔧 **工具集成**：内置工具和API工具的无缝集成
- 📚 **知识库管理**：创建和管理文档知识库，增强AI的回答能力
- 🔄 **工作流编排**：设计复杂的AI工作流程
- 📊 **应用分析**：监控和分析应用性能和用户交互

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm 8+

### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/llmops-ui.git
cd llmops-ui

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm dev
```

### 构建

```bash
# 类型检查、编译和压缩生产版本
pnpm build
```

### 测试

```bash
# 运行单元测试
pnpm test:unit
```

### 代码检查

```bash
# 运行代码检查
pnpm lint
```

## 🧩 项目结构

```
llmops-ui/
├── public/             # 静态资源
├── src/                # 源代码
│   ├── assets/         # 资源文件
│   ├── components/     # 公共组件
│   ├── config/         # 配置文件
│   ├── hooks/          # 自定义钩子
│   ├── models/         # 数据模型
│   ├── router/         # 路由配置
│   ├── services/       # API服务
│   ├── stores/         # Pinia状态管理
│   ├── utils/          # 工具函数
│   ├── views/          # 页面视图
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── index.html          # HTML模板
├── vite.config.ts      # Vite配置
├── tsconfig.json       # TypeScript配置
└── package.json        # 项目依赖
```

## 🛠️ 技术栈

- **前端框架**：Vue 3
- **构建工具**：Vite
- **UI组件库**：Arco Design Vue
- **状态管理**：Pinia
- **路由**：Vue Router
- **HTTP客户端**：Axios
- **类型检查**：TypeScript
- **代码规范**：ESLint + Prettier + Oxlint

## 📋 主要功能模块

### 应用管理

- 创建和管理AI应用
- 配置应用能力和参数
- 应用版本发布和回滚
- 应用性能分析

### 工具管理

- 内置工具集成
- 自定义API工具配置
- OpenAPI规范支持

### 知识库

- 文档上传和管理
- 文档分段和索引
- 知识检索集成

### 工作流

- 可视化工作流设计
- 多步骤流程编排
- 条件分支和循环支持

## 🤝 贡献指南

我们欢迎所有形式的贡献，无论是新功能、文档改进还是bug修复。

1. Fork 项目
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

## 📞 联系我们

如有任何问题或建议，请通过以下方式联系我们：

- 项目Issues: [GitHub Issues](https://github.com/v833/llmops-ui/issues)

---

<div align="center">
  <p>Made with ❤️ by LLMOps Team</p>
</div>
