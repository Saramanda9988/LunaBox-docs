# 自定义统计模板

LunaBox 支持用户完全自定义统计报告模板。您可以通过编写 HTML 文件并注入内置的数据变量，生成符合个人偏好的界面布局与样式的游玩统计报告。

## 1. 模板目录位置

在使用自定义模板之前，您需要将模板文件放置在指定的目录中：

- **便携版**: 放于程序所在目录的 `templates` 文件夹（即 `<程序目录>\templates`）。
- **安装版**: 放于应用数据目录的 `templates` 文件夹（快捷访问：`%APPDATA%\LunaBox\templates`）。

## 2. 创建模板与元数据

在 `templates` 目录中创建一个后缀为 `.html` 的文件（例如 `custom_report.html`），文件名即为该模板的内部 ID。

建议在文件最开头添加一段 HTML 注释，用于声明模板的元数据信息，以便 LunaBox 在界面中正确展示。

```html
<!--
@name: 我的自定义模板
@description: 包含基础信息与排行榜的简洁模板
@author: your_name
@version: 1.0.0
-->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>自定义统计报告</title>
</head>
<body>
  <!-- 模板内容 -->
</body>
</html>
```

::: tip
如果您未在文件中提供这段元数据注释，系统将默认使用文件名作为模板名称 (`Name`)，并将版本设定为 `1.0.0`。
:::

## 3. 数据变量注入

在模板 HTML 中，您可以使用 <code v-pre>{{.变量名}}</code> 的语法来注入 LunaBox 传递的统计数据。

常用基础字段包括：

- <code v-pre>{{.StartDate}}</code> 和 <code v-pre>{{.EndDate}}</code>：统计周期的开始与结束日期。
- <code v-pre>{{.TotalPlayCount}}</code>：周期内的总游玩次数。
- <code v-pre>{{.TotalPlayTimeStr}}</code>：格式化后的总游玩时长（如“12小时30分钟”）。
- <code v-pre>{{.AISummary}}</code>：AI 生成的周期游玩总结。

**示例：**

```html
<h1>游玩总结 ({{.StartDate}} - {{.EndDate}})</h1>
<p>您在此期间共游玩了 {{.TotalPlayCount}} 次，累计时长 {{.TotalPlayTimeStr}}。</p>

{{if .AISummary}}
  <div class="ai-summary">
    <h3>AI 总结：</h3>
    <p>{{.AISummary}}</p>
  </div>
{{end}}
```

## 4. 渲染排行榜

通过 <code v-pre>{{range .Leaderboard}}</code> 语法，您可以遍历并渲染游玩时长排行榜。

排行榜中可用的常用字段包括 `Rank`（排名）、`GameName`（游戏名）、`DurationStr`（时长）等。

```html
<h2>时长排行榜</h2>
{{range .Leaderboard}}
  <div class="game-item">
    <strong>{{.Rank}}. {{.GameName}}</strong>
    <span>游玩时长：{{.DurationStr}}</span>
    
    {{if .CoverBase64}}
      <img src="{{.CoverBase64}}" alt="{{.GameName}}">
    {{else if .CoverURL}}
      <img src="{{.CoverURL}}" alt="{{.GameName}}">
    {{end}}
  </div>
{{end}}
```

::: tip
强烈推荐优先使用 <code v-pre>{{.CoverBase64}}</code> 来渲染游戏封面。LunaBox 会在后台自动将图片转为 Base64 格式，这能有效避免跨域报错，并确保在断网或导出报告后图片依然能正常显示。
:::

## 5. 注入图表数据

如果您在模板中集成了 Chart.js 或 ECharts 等前端图表库，LunaBox 已经为您准备好了可以直接使用的 JSON 格式预处理数据。

您可以将其注入到一个 JSON `<script>` 标签中，供前端 JavaScript 读取配置：

```html
<script id="chart-data-config" type="application/json">
{
  "labels": {{ .ChartLabels | safeJS }},
  "data": {{ .ChartData | safeJS }},
  "gameTrend": {{ .GameTrendData | safeJS }}
}
</script>
```

::: warning 注意事项
注入 JSON 或 HTML 数据时，请使用 `| safeJS` 或 `| safeHTML` 管道函数，以告知模板引擎该内容是安全的，避免由于自动转义导致图表解析失败。
:::

## 6. 开发建议

- **从现有模板起步**：直接从零编写可能会遗漏重要标签。建议复制软件内置的模板骨架（如 `editorial_report.html`），在此基础上修改样式。
- **避免重名**：请确保您的文件名称不与 LunaBox 内置的模板文件重名，目前同名文件无法覆盖内置模板。
- **模板函数计算**：模板内支持基础的数学计算（如 `add`, `sub`, `mul`, `div`），使用 `div` 语法时需自行保证除数不为 0。
