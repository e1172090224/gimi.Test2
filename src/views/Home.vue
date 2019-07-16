<template>
    <div id="app">
        <el-row>
            <el-col :span="8" :offset="6">
                <el-input placeholder="请输入关键字" icon="search" v-model="search"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="dialogVisible = true">添加</el-button>
            </el-col>
        </el-row>
        <el-table
                :data="tables"
                border
                style="width: 100%">
            <el-table-column
                    prop="fatherName"
                    label="父类别名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="类别名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="类别描述">
            </el-table-column>
            <el-table-column
                    prop="done"
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            style="margin-right: 20px"
                            @click="editTableData(scope.$index)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <el-row>
                父类别名称 ：
                <el-select v-model="value" value="">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-row>
            <el-row>
                类别名称：
                <el-input v-model='productName' style="width: 70%;margin: 10px 0 10px 0"></el-input>
            </el-row>
            <el-row>
                类别描述：
                <el-input v-model='productDescription' style="width: 70%"></el-input>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addData">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisibleb"
                width="30%">
            <el-row>
                父类别名称 ：
                <el-select v-model="value" value="">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-row>
            <el-row>
                类别名称：
                <el-input v-model='productNameb' style="width: 70%;margin: 10px 0 10px 0"></el-input>
            </el-row>
            <el-row>
                类别描述：
                <el-input v-model='productDescriptionb' style="width: 70%"></el-input>
            </el-row>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleb = false">取 消</el-button>
    <el-button type="primary" @click="updateData">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import ajax from '../ajax';

    export default {
        name: 'home',
        data() {
            return {
                tableData: [],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                search: '',
                dialogVisible: false,
                dialogVisibleb: false,
                productName: '',
                productDescription: '',
                productNameb: '',
                productDescriptionb: '',
                _index: ''
            };
        },
        computed: {
            //查询
            tables() {
                if (this.search) {
                    return this.tableData.filter(item =>
                        Object.keys(item).some(key =>
                            String(item[key]).toLowerCase().indexOf(this.search) > -1
                        )
                    );
                } else return this.tableData;
            }
        },
        methods: {
            editTableData(index) {
                this.dialogVisibleb = true;
                this._index = index;
            },
            //添加
            addData() {
                this.dialogVisible = false;
                ajax({
                    url: '/goods/category',
                    method: 'post',
                    data: {
                        'description': this.productDescription,
                        'name': this.productName,
                        'parentId': 0,
                    }
                }).then(() => {
                    this.getData();
                }).catch(error => {
                    console.log(error);
                });
            },
            //删除
            handleDelete(index) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            ajax({
                                url: '/goods/category',
                                method: 'delete',
                                params: {
                                    'categoryId': this.tableData[index].resDataId,
                                }
                            }).then(() => {
                                this.getData();
                            }).catch(error => {
                                console.log(error);
                            });
                            done();
                            instance.confirmButtonLoading = false;
                        } else {
                            done();
                        }
                    }
                });
            },
            //修改
            updateData() {
                ajax({
                    url: '/goods/category',
                    method: 'put',
                    data: {
                        'categoryId': this.tableData[this._index].resDataId,//this.tableData[this._index].resDataId
                        'description': this.productDescriptionb,
                        'name': this.productNameb,
                        'parentId': 0,
                    }
                }).then(() => {
                    this.getData();

                }).catch(error => {
                    console.log(error);
                });
                this.dialogVisibleb = false;
            },
        },
        mounted(){
            ajax({
                url: '/goods/category',
                method: 'get',
            }).then(res => {
                this.tableData.splice(0, this.tableData.length);
                const resData = res.data.data.data;
                resData.forEach((items) => {
                    if(items.delete === false){
                        this.tableData.push({
                            'name': items.name,
                            'description': items.description,
                            'resDataId': items.categoryId
                        });
                    }
                });
            }).catch(error => {
                console.log(error);
            });
        }
    };
</script>
